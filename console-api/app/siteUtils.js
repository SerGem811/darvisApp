const uuidv1 = require('uuid/v1');
const canvas = require('canvas');
const config = require('../config');
const { deleteFile, getMainPath } = require('./fileUtils');

function getLowerSiteName(siteName) {
  return siteName.replace(' ', '').toLowerCase();
}

function getImageDimensions(file) {
  var i = new canvas.Image;
  i.src = 'data:image/png;base64,' + file;
  return { w: i.width, h: i.height };
}

exports.getDataWorldJson = function (site) {
  var levels = [];
  var levelDetails = [];
  site.levels.map((item, i) => {
    var level = {};
    var levelDetail = {};
    level.levelId = item._id;
    level.cameras = [];
    const levelCameras = site.cameras.filter(x => x.levelId === item._id);
    levelCameras.map((cam, j) => {
      var camera = {
        number: j + 1,
        cameraType: cam.type,
        name: cam.name,
        url: cam.url,
        enabled: cam.isActive,
        user: cam.user,
        pass: cam.password,
        cam_res_x: cam.cam_res_x,
        cam_res_y: cam.cam_res_y,
        homography: cam.homography,
        src_points: cam.cameraPoints,
        dst_points: cam.floorPlanPoints,
        ai_roi: cam.ai_roi,
      }
      level.cameras.push(camera);
    });
    levels.push(level);

    levelDetail.levelId = item._id;
    levelDetail.name = item.name;
    levelDetail.level = i + 1;
    levelDetail.plan = config.path + '/levels/' + item.plan.replace('\\uploads\\', '');
    levelDetail.zones = [];
    item.zones.map(z => {
      var zone = {
        name: z.name,
        p1x: z.points.p1.x,
        p1y: z.points.p1.y,
        p2x: z.points.p2.x,
        p2y: z.points.p2.y,
        p3x: z.points.p3.x,
        p3y: z.points.p3.y,
        p4x: z.points.p4.x,
        p4y: z.points.p4.y,
      };
      levelDetail.zones.push(zone);
    });
    levelDetails.push(levelDetail);
  });
  var triggers = [];
  site.dwInfo.objects[3].triggers.map(item => {
    var trigger = {};
    trigger.id = item._id
    trigger.name = item.name;
    trigger.condition = item.condition;
    var action = {};
    if (item.action && item.action.type) {
      action.type = item.action.type;
      action.receipient = item.action.receipient;
      if (action.type === 'publish' || action.type === 'json') {
        var body = {};
        item.action.fields.map(f => {
          body[f.name] = f.value;
        });
        action.body = body;
      } else if (action.type === 'text' || action.type === 'email') {
        action.body = item.action.body
      }
    }
    trigger.action = action;
    triggers.push(trigger);
  });
  lowerSiteName = site.dwInfo.name;

  return {
    dataworldId: site.dwInfo._id,
    //version: 3,
    //revision: 5,
    //dwType: site.structure.dwType,
    dataworldName: lowerSiteName,
    site_name: site.name,
    owner: site.owner,
    //darvisType: site.structure.darvisType,
    createdOn: site.created,
    viewers: site.dwInfo.viewers,
    dataSources: [
      {
        name: lowerSiteName,
        ai: site.ai,
        data: site.data,
        levels: levels,
      }
    ],
    dataObjects: [
      {
        // level details 
        // object tyep building
        objectId: site.dwInfo.objects[0].objectId,
        objType: site.dwInfo.objects[0].objType,
        levels: levelDetails.length,
        levelDetails: levelDetails,
      },
      {
        // mapping
        // datapoint
        objectId: site.dwInfo.objects[1].objectId,
        objType: site.dwInfo.objects[1].objType,
        objParent: site._id,
        objPositioning: 'inOtherObject',
        refreshData: true,
        floorUrls: [],
        name: 'beds',
        mappings: [
          {
            src: lowerSiteName + '.id',
            dst: 'instance'
          },
          {
            src: lowerSiteName + '.loc_x',
            dst: 'loc_x'
          },
          {
            src: lowerSiteName + '.loc_y',
            dst: 'loc_y'
          },
          {
            src: lowerSiteName + '.camera_id',
            dst: 'camera_id'
          },
          {
            src: lowerSiteName + '.camera_name',
            dst: 'camera_name'
          },
          {
            src: lowerSiteName + '.frame_timestamp',
            dst: 'timestamp'
          },
          {
            src: lowerSiteName + '.lasttime',
            dst: 'lasttime'
          },
          {
            src: lowerSiteName + '.object_type',
            dst: 'target'
          },
          {
            src: lowerSiteName + '.[lookup_levels]',
            dst: 'level'
          }
        ]
      },
      {
        // kpi
        objectId: site.dwInfo.objects[2].objectId,
        objType: site.dwInfo.objects[2].objType,
        kpis: site.dwInfo.objects[2].kpis,
      },
      {
        // trigger
        objectId: site.dwInfo.objects[3].objectId,
        objType: site.dwInfo.objects[3].objType,
        triggers: triggers
      }
    ],
    lookups: site.dwInfo.lookups,
    localTimezone: site.dwInfo.localTimezone
  }
};

exports.generateDataWorld = function (site) {
  return ({
    _id: uuidv1(),
    name: getLowerSiteName(site.name),
    version: 3,
    revision: 5,
    dwType: 'darvis',
    darvisType: 'healthcare',
    createdOn: Date.now,
    viewers: [],
    objects: [
      {
        objectId: uuidv1(),
        objType: 'building',
      },
      {
        objectId: uuidv1(),
        objectType: 'datapoint',
      },
      {
        objectId: uuidv1(),
        objType: 'kpi',
        kpis: [],
      },
      {
        objectId: uuidv1(),
        objType: 'trigger',
        triggers: [],
      }
    ],
    lookups: [],
    localTimezone: 'CET'
  });
}

// leve functionalities
exports.addLevelToSite = function (name, vtype, plan, site) {
  // update db after completing this call
  return new Promise((resolve, reject) => {
    if (site) {
      const allLevels = site.levels;
      const level = {
        _id: uuidv1(),
        name,
        scale: 0.0023,
        plan,
        vtype,
        serviceHours: 'mon-fri/6-19',
        zones: []
      };
      allLevels.push(level);
      resolve(site);
    } else {
      reject('Site cant be null');
    }
  });
};
exports.updateLevel = function (level, plan, site) {
  // update db after completing this call
  return new Promise((resolve, reject) => {
    if (site) {
      const selectedLevel = site.levels.find(x => x.id == level._id);
      if (selectedLevel != null) {
        selectedLevel.name = level.name;
        if (plan != "")
          selectedLevel.plan = plan;
      }
      resolve(site);
    } else {
      reject('Site cant be null');
    }
  });
};
exports.deleteLevelFromSite = function (site, levelId) {
  return new Promise((resolve, reject) => {
    if (site && levelId) {
      const levels = site.levels;
      const index = levels.findIndex(x => x._id === levelId);
      const level = levels[index];
      const levelFileName = level.plan.replace('\\uploads\\', '');
      site.levels.splice(index, 1);
      // remove image;
      const path = getMainPath();
      deleteFile(path + '/levels/' + levelFileName);
      deleteFile('./public/uploads/' + levelFileName);
      resolve(site);
    } else {
      reject('error');
    }
  });
};

// zone functionalities
exports.addZoneToLevel = function (site, zone) {
  return new Promise((resolve, reject) => {
    if (site) {
      const selectedLevel = site.levels.find(x => x._id == zone.levelId);

      if (selectedLevel != null) {
        const newZone = {
          _id: uuidv1(),
          name: zone.name,
          points: zone.points
        };

        selectedLevel.zones.push(newZone);
      } else {
        reject('Can not find the proper level');
      }

      resolve(site);
    } else {
      reject('Site cant be null');
    }
  });
};
exports.updateZone = function (site, zone) {
  return new Promise((resolve, reject) => {
    if (site) {
      const selectedLevel = site.levels.find(x => x._id == zone.levelId);

      if (selectedLevel != null) {
        const oldZone = selectedLevel.zones.find(x => x._id == zone._id);
        oldZone.name = zone.name;
        oldZone.points = zone.points
      } else {
        reject('Can not find the proper level');
      }

      resolve(site);
    } else {
      reject('Site cant be null');
    }
  });
};
exports.deleteZone = function (site, zoneId, levelId) {
  return new Promise((resolve, reject) => {
    if (site && zoneId) {

      const level = site.levels.find(x => x._id === levelId);
      const zone = level.zones.findIndex(x => x._id === zoneId);
      level.zones.splice(zone, 1);

      resolve(site);
    } else {
      reject("Something is null");
    }
  });
};

// AI functionalities
exports.addAI = function (site, ai) {
  return new Promise((resolve, reject) => {
    if (site) {
      const aiData = {
        _id: uuidv1(),
        type: ai.type,
        version: ai.version,
        containerURL: ai.containerURL,
        classes: ai.classes
      }
      site.ai.push(aiData);
      resolve(site);
    } else {
      reject('Site cant be null');
    }
  });
};
// AI data functionalites
exports.addAIData = function (site, data) {
  return new Promise((resolve, reject) => {
    if (site) {
      if (data && data.length > 0) {
        data.map(item => {
          site.data.push(item);
        })
      }
      resolve(site);
    } else {
      reject('Site cant be null');
    }
  });
};

exports.addCamera = function (site, camera, cameraPoints, floorPlanPoints) {
  const fs = require('fs');
  const fileName = `${Date.now()}-${camera.name}.png`;
  const filePath = './public/uploads/' + fileName;
  try {
    const resolution = getImageDimensions(camera.image);
    if (resolution) {
      camera.cam_res_x = resolution.w;
      camera.cam_res_y = resolution.h;
    }
    fs.writeFile(filePath, camera.image, { encoding: 'base64' }, function (err) {
      if (err) {
        camera.image = '';
      } else {
        camera.image = '/uploads/' + fileName;
      }
    });
    camera.image = '/uploads/' + fileName;

  } catch (e) {
    console.log(e);
  }

  return new Promise((resolve, reject) => {
    if (site && camera /*&& cameraPoints && floorPlanPoints*/) {
      camera.homography = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 1
      };
      camera.cameraPoints = cameraPoints;
      camera.floorPlanPoints = floorPlanPoints;
      camera.isActive = true;
      site.cameras.push(camera);
      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.enableCamera = function (site, cameraId) {
  return new Promise((resolve, reject) => {
    if (site && cameraId) {
      const selectedCamera = site.cameras.find(x => x._id === cameraId);
      selectedCamera.isActive = !selectedCamera.isActive;
      resolve(site);
    } else {
      reject('Something is null');
    }
  })
}

exports.updateCamera = function (site, camera, cameraPoints, floorPlanPoints, homography) {
  const fs = require('fs');
  return new Promise((resolve, reject) => {
    if (site && camera && camera._id) {
      console.log(cameraPoints);
      console.log(floorPlanPoints);
      console.log(homography);
      if (floorPlanPoints) {
        camera.floorPlanPoints = floorPlanPoints;
      } else {
        camera.floorPlanPoints = {};
      }
      if (cameraPoints) {
        camera.cameraPoints = cameraPoints;
      } else {
        camera.cameraPoints = {};
      }
      if (homography) {
        camera.homography = homography;
      } else {
        camera.homography = {
          a: 0,
          b: 0,
          c: 0,
          d: 0,
          e: 0,
          f: 0,
          g: 0,
          h: 0,
          i: 1
        };
      }
      const selectedCamera = site.cameras.find(x => x._id === camera._id);

      selectedCamera.name = camera.name;
      selectedCamera.url = camera.url;

      // check camera image is changed
      if (!camera.image.startsWith('/uploads')) {
        // image is changed
        const resolution = getImageDimensions(camera.image);
        if (resolution) {
          selectedCamera.cam_res_x = resolution.w;
          selectedCamera.cam_res_y = resolution.h;
        }
        try {
          fs.writeFile('./public' + selectedCamera.image, camera.image, { encoding: 'base64' }, function (err) {
            if (err) {
              selectedCamera.image = '';
              console.log('error');
            } else {

            }
          });
        } catch (e) {
          console.log(e);
        }
      }
      //selectedCamera.image = camera.image;
      selectedCamera.type = camera.type;
      selectedCamera.user = camera.user;
      selectedCamera.pass = camera.pass;
      selectedCamera.levelId = camera.levelId;
      selectedCamera.homography = camera.homography;
      selectedCamera.cameraPoints = cameraPoints;
      selectedCamera.floorPlanPoints = floorPlanPoints;
      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.deleteCamera = function (site, cameraId) {
  return new Promise((resolve, reject) => {
    if (site && cameraId) {
      const cameraIndex = site.cameras.findIndex(x => x._id === cameraId);
      const filePath = site.cameras[cameraIndex].image;
      site.cameras.splice(cameraIndex, 1);
      deleteFile('./public' + filePath);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.addKPIs = function(site, kpis) {
  return new Promise((resolve, reject) => {
    if (site) {
      kpis.forEach(item => {
        let k = item;
        k = {
          _id: uuidv1(),
          ...k
        }
        site.dwInfo.objects[2].kpis.push(k);
      });
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
}

// kpi functionalities
exports.addKPI = function (site, kpi) {
  return new Promise((resolve, reject) => {
    if (site) {
      let k = kpi;
      k = {
        _id: uuidv1(),
        ...k
      }
      site.dwInfo.objects[2].kpis.push(k);
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
};
exports.updateKPI = function (site, kpi) {
  return new Promise((resolve, reject) => {
    if (site) {
      const k = site.dwInfo.objects[2].kpis.find(x => x._id === kpi._id);
      k.name = kpi.name;
      k.interval = kpi.interval;
      k.type = kpi.type;
      k.object = kpi.object;
      if (kpi.attribute) {
        k.attribute = kpi.attribute;
      } else if (k.attribute) {
        delete k.attribute;
      }
      if (kpi.state) {
        k.state = kpi.state;
      } else if (k.state) {
        delete k.state;
      }
      if (kpi.where) {
        k.where = kpi.where;
      } else if (k.where) {
        delete k.where;
      }
      if (kpi.events) {
        k.events = kpi.events;
      } else if (k.events) {
        delete k.events;
      }
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
};
exports.deleteKPI = function (site, kpiId) {
  return new Promise((resolve, reject) => {
    if (site && kpiId) {
      const kpis = site.dwInfo.objects[2].kpis;
      const kpiIndex = kpis.findIndex(x => x._id == kpiId);
      kpis.splice(kpiIndex, 1);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

// trigger functionalities
exports.addTrigger = function (site, trigger) {
  return new Promise((resolve, reject) => {
    if (site) {
      site.dwInfo.objects[3].triggers.push(trigger);
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
};
exports.updateTrigger = function (site, trigger) {
  return new Promise((resolve, reject) => {
    if (site) {
      const t = site.dwInfo.objects[3].triggers.find(x => x._id === trigger._id);
      t.name = trigger.name;
      t.condition = trigger.condition;
      t.action = trigger.action ? trigger.action : {};
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
};
exports.deleteTrigger = function (site, triggerId) {
  return new Promise((resolve, reject) => {
    if (site && triggerId) {
      const triggers = site.dwInfo.objects[3].triggers;
      const triggerIndex = triggers.findIndex(x => x._id == triggerId);
      triggers.splice(triggerIndex, 1);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.generateAI = function () {
  return ({
    _id: uuidv1(),
    type: 'healthcare',
    version: 2.2,
    containerURL: null,
    classes: [
      {
        "classId": 1,
        "className": "bed",
        "attributes": [
          "clean",
          "unclean",
          "occupied"
        ],
        "states": [
          "fixed",
          "moving"
        ]
      },
      {
        "classId": 2,
        "className": "person",
        "attributes": [
          "male",
          "female"
        ],
        "states": [
          "fixed",
          "moving"
        ]
      }
    ]
  });
}
exports.generateAIData = function () {
  return ([
    {
      "src": "object_id",
      "dst": "object_id",
      "use": true,
      "fieldType": "string"
    },
    {
      "src": "camera_id",
      "dst": "camera_id",
      "use": true,
      "fieldType": "string"
    },
    {
      "src": "camera_name",
      "dst": "camera_name",
      "use": true,
      "fieldType": "string"
    },
    {
      "src": "timestamp",
      "dst": "timestamp",
      "use": true,
      "fieldType": "string"
    },
    {
      "src": "object_type",
      "dst": "object_type",
      "use": true,
      "fieldType": "string"
    },
    {
      "src": "loc_x",
      "dst": "loc_x",
      "use": true,
      "fieldType": "float"
    },
    {
      "src": "loc_y",
      "dst": "loc_y",
      "use": true,
      "fieldType": "float"
    }
  ]);
}