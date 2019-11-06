const uuidv1 = require('uuid/v1');
const canvas = require('canvas');
function getLowerSiteName(siteName) {
  return siteName.replace(' ', '').toLowerCase();
}

function getImageDimensions(file) {
  var i = new canvas.Image;
  i.src = 'data:image/png;base64,' + file;
  return { w: i.width, h: i.height };
}

exports.getDataWorldJson = function (site, ais) {
  var levels = [];
  site.structure.dataSources[0].levels.map(item => {
    var level = {};
    level.levelId = item.levelId;
    level.cameras = [],
      item.cameras.map((cam, index) => {
        var ai_roi = {
          p1x: 0,
          p1y: 0,
          p2x: 0,
          p2y: 0,
          p3x: 0,
          p3y: 0,
          p4x: 0,
          p4y: 0,
        };
        if (cam.cameraPoints) {
          if (cam.cameraPoints.p1.x < 0.5) {
            ai_roi.p1x = cam.cameraPoints.p1.x - cam.cameraPoints.p1.x * 0.3;
          } else {
            ai_roi.p1x = cam.cameraPoints.p1.x + (1 - cam.cameraPoints.p1.x) * 0.3;
          }
          if (cam.cameraPoints.p1.y < 0.5) {
            ai_roi.p1y = cam.cameraPoints.p1.y - cam.cameraPoints.p1.y * 0.3;
          } else {
            ai_roi.p1y = cam.cameraPoints.p1.y + (1 - cam.cameraPoints.p1.y) * 0.3;
          }

          if (cam.cameraPoints.p2.x < 0.5) {
            ai_roi.p2x = cam.cameraPoints.p2.x - cam.cameraPoints.p2.x * 0.3;
          } else {
            ai_roi.p2x = cam.cameraPoints.p2.x + (1 - cam.cameraPoints.p2.x) * 0.3;
          }
          if (cam.cameraPoints.p2.y < 0.5) {
            ai_roi.p2y = cam.cameraPoints.p2.y - cam.cameraPoints.p2.y * 0.3;
          } else {
            ai_roi.p2y = cam.cameraPoints.p2.y + (1 - cam.cameraPoints.p2.y) * 0.3;
          }

          if (cam.cameraPoints.p3.x < 0.5) {
            ai_roi.p3x = cam.cameraPoints.p3.x - cam.cameraPoints.p3.x * 0.3;
          } else {
            ai_roi.p3x = cam.cameraPoints.p3.x + (1 - cam.cameraPoints.p3.x) * 0.3;
          }
          if (cam.cameraPoints.p3.y < 0.5) {
            ai_roi.p3y = cam.cameraPoints.p3.y - cam.cameraPoints.p3.y * 0.3;
          } else {
            ai_roi.p3y = cam.cameraPoints.p3.y + (1 - cam.cameraPoints.p3.y) * 0.3;
          }

          if (cam.cameraPoints.p1.x < 0.5) {
            ai_roi.p4x = cam.cameraPoints.p4.x - cam.cameraPoints.p4.x * 0.3;
          } else {
            ai_roi.p4x = cam.cameraPoints.p4.x + (1 - cam.cameraPoints.p4.x) * 0.3;
          }
          if (cam.cameraPoints.p4.y < 0.5) {
            ai_roi.p4y = cam.cameraPoints.p4.y - cam.cameraPoints.p4.y * 0.3;
          } else {
            ai_roi.p4y = cam.cameraPoints.p4.y + (1 - cam.cameraPoints.p4.y) * 0.3;
          }
        }

        var camera = {
          number: index + 1,
          cameraType: cam.type,
          name: cam.name,
          url: cam.url,
          enabled: cam.isActive,
          user: cam.username,
          pass: cam.password,
          cam_res_x: cam.cam_res_x,
          cam_res_y: cam.cam_res_y,
          homography: cam.homography ? [
            cam.homography.a,
            cam.homography.b,
            cam.homography.c,
            cam.homography.d,
            cam.homography.e,
            cam.homography.f,
            cam.homography.g,
            cam.homography.h,
            cam.homography.i,
          ] : [],
          src_points: cam.cameraPoints ? {
            p1x: cam.cameraPoints.p1.x,
            p1y: cam.cameraPoints.p1.y,
            p2x: cam.cameraPoints.p2.x,
            p2y: cam.cameraPoints.p2.y,
            p3x: cam.cameraPoints.p3.x,
            p3y: cam.cameraPoints.p3.y,
            p4x: cam.cameraPoints.p4.x,
            p4y: cam.cameraPoints.p4.y,
          } : {},
          dst_points: cam.floorPlanPoints ? {
            p1x: cam.floorPlanPoints.p1.x,
            p1y: cam.floorPlanPoints.p1.y,
            p2x: cam.floorPlanPoints.p2.x,
            p2y: cam.floorPlanPoints.p2.y,
            p3x: cam.floorPlanPoints.p3.x,
            p3y: cam.floorPlanPoints.p3.y,
            p4x: cam.floorPlanPoints.p4.x,
            p4y: cam.floorPlanPoints.p4.y,
          } : {},
          ai_roi: cam.cameraPoints ? ai_roi : {},
        }
        level.cameras.push(camera);
      });
    levels.push(level);
  });

  var levelDetails = [];
  site.structure.dataObjects[0].levelDetails.map(item => {
    var levelDetail = {};
    levelDetail.levelId = item.id;
    levelDetail.name = item.name;
    levelDetail.level = item.level;
    levelDetail.plan = '/home/darvis/levels' + item.plan.replace('\\uploads\\', '');
    levelDetail.zones = [];
    item.zones.map(zone => {
      var z = {
        name: zone.name,
        p1x: zone.points.p1.x,
        p1y: zone.points.p1.y,
        p2x: zone.points.p2.x,
        p2y: zone.points.p2.y,
        p3x: zone.points.p3.x,
        p3y: zone.points.p3.y,
        p4x: zone.points.p4.x,
        p4y: zone.points.p4.y,
      }

      levelDetail.zones.push(z);
    });
    levelDetails.push(levelDetail);
  });

  var triggers = [];
  site.structure.dataObjects[3].triggers.map(item => {
    var trigger = {};
    trigger.id = item.id
    trigger.name = item.name;
    trigger.condition = item.condition;
    var action = {};
    if (item.action && item.action.type) {
      action.type = item.action.type;
      action.receipient = item.action.receipient;
      if(action.type === 'publish' || action.type === 'json') {
        var body = {};
        item.action.fields.map(f => {
          body[f.name] = f.value;
        });
        action.body = body;
      } else if(action.type === 'text' || action.type === 'email') {
        action.body = item.action.body
      }
    }
    trigger.action = action;
    triggers.push(trigger);
  })

  lowerSiteName = site.structure.dataSources[0].name;
  return {
    dataworldId: site.structure.dataworldId,
    //version: 3,
    //revision: 5,
    //dwType: site.structure.dwType,
    dataworldName: lowerSiteName,
    site_name: site.name,
    owner: site.structure.owner,
    //darvisType: site.structure.darvisType,
    createdOn: site.created,
    viewers: site.structure.viewers,
    dataSources: [
      {
        name: site.structure.dataSources[0].name,
        ai: ais,
        data: [
          {
            src: 'id',
            dst: 'id',
            use: true,
            fieldType: 'string'
          },
          {
            src: 'camera_id',
            dst: 'camera_id',
            use: true,
            fieldType: 'string'
          },
          {
            src: 'camera_name',
            dst: 'camera_name',
            use: true,
            fieldType: 'string'
          },
          {
            src: 'frame_timestamp',
            dst: 'frame_timestamp',
            use: true,
            fieldType: 'string'
          },
          {
            src: 'object_type',
            dst: 'object_type',
            use: true,
            fieldType: 'string'
          },
          {
            src: 'loc_x',
            dst: 'loc_x',
            use: true,
            fieldType: 'float'
          },
          {
            src: 'loc_y',
            dst: 'loc_y',
            use: true,
            fieldType: 'float'
          }
        ],
        levels: levels,
      }
    ],
    dataObjects: [
      {
        // level details 
        // object tyep building
        objectId: site.structure.dataObjects[0].objectId,
        objType: 'building',
        levels: site.structure.dataObjects[0].levels,
        levelDetails: levelDetails,
      },
      {
        // mapping
        // datapoint
        objectId: site.structure.dataObjects[1].objectId,
        objType: 'datapoint',
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
        objectId: site.structure.dataObjects[1].objectId,
        objType: 'kpi',
        kpis: site.structure.dataObjects[2].kpis,
      },
      {
        // trigger
        objectId: 'eda82b6a-6607-4830-be50-3fb2d174975e',
        objType: 'trigger',
        triggers: triggers
      }
    ],
    lookups: [],
    localTimezone: 'CET'
  }
};

exports.generateDataWorld = function (site, ai) {
  const lowerSiteName = getLowerSiteName(site.name);
  return ({
    dataworldId: uuidv1(),
    version: 3,
    revision: 5,
    dwType: 'darvis',
    dataworldName: lowerSiteName,
    owner: site.organization,
    darvisType: 'healthcare',
    createdOn: Date.now,
    viewers: [],
    dataSources: [
      {
        objType: 'east_video',
        name: lowerSiteName,
        format: 'json',
        endpointid: 'hospitalraw',
        authToken: 'authstring',
        vmsType: 'none',
        ai: ai,
        data: [],
        levels: [],
      },
      {
        name: 'buildingdetails',
        format: 'json',
        endpointId: 'constantendpt',
        authToken: '',
        data: [],
      }
    ],
    dataObjects: [
      {
        objectId: uuidv1(),
        objType: 'building',
        mappings: [],
        levels: 0,
        levelDetails: [],
      },
      {
        objectId: uuidv1(),
        objectType: 'datapoint',
        objParent: '',
        objPositioning: 'inOtherObject',
        refreshData: true,
        floorUrls: [],
        name: 'beds',
        mappings: [],
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
        action: {},
      }
    ],
    lookups: [],
    localTimezone: 'CET'
  });
}

exports.addLevelToSite = function (name, vtype, plan, site) {
  // update db after completing this call
  return new Promise((resolve, reject) => {
    if (site) {
      const { dataObjects, dataSources } = site.structure;

      const allLevels = dataObjects[0];
      allLevels.levels += 1;
      const level = {
        id: uuidv1(),
        level: allLevels.levelDetails.length + 1,
        name,
        scale: 0.0023,
        plan,
        vtype,
        zones: []
      };
      allLevels.levelDetails.push(level);

      const allCameras = dataSources[0].levels;

      const levelCamera = {
        levelId: level.id,
        name: level.name,
        serviceHours: 'mon-fri/6-16',
        cameras: []
      };

      allCameras.push(levelCamera);

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
      const { dataObjects, dataSources } = site.structure;
      const allLevels = dataObjects[0];
      const selectedLevel = allLevels.levelDetails.find(x => x.id == level.level_id);
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
      const objectLevels = site.structure.dataObjects[0].levelDetails;
      const selectedLevelIndex = objectLevels.findIndex(x => x.id === levelId);
      site.structure.dataObjects[0].levelDetails.splice(selectedLevelIndex, 1);

      site.structure.dataObjects[0].levels = site.structure.dataObjects[0].levelDetails.length;
      const sourceLevels = site.structure.dataSources[0].levels;
      const levelIndex = sourceLevels.findIndex(x => x.levelId === levelId);
      site.structure.dataSources[0].levels.splice(levelIndex, 1);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.addZoneToLevel = function (site, zone) {
  return new Promise((resolve, reject) => {
    if (site) {
      const { dataObjects } = site.structure;
      const allLevels = dataObjects[0];
      const selectedLevel = allLevels.levelDetails.find(x => x.id == zone.level_id);

      if (selectedLevel != null) {
        const newZone = {
          id: uuidv1(),
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
      const { dataObjects, dataSources } = site.structure;
      const allLevels = dataObjects[0];
      const selectedLevel = allLevels.levelDetails.find(x => x.id == zone.level_id);

      if (selectedLevel != null) {
        const oldZone = selectedLevel.zones.find(x => x.id == zone.id);
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

      const levelDetails = site.structure.dataObjects[0].levelDetails;
      const selectedLevelIndex = levelDetails.find(x => x.id === levelId);
      const zone = selectedLevelIndex.zones.findIndex(x => x.id === zoneId);
      selectedLevelIndex.zones.splice(zone, 1);

      resolve(site);
    } else {
      reject("Something is null");
    }
  });
};

exports.addCameraToLevel = function (site, camera, levelId, cameraPoints, floorPlanPoints) {
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


  } catch {

  }

  return new Promise((resolve, reject) => {
    if (site && camera && levelId /*&& cameraPoints && floorPlanPoints*/) {

      // save camera image to file
      const sourcelevels = site.structure.dataSources[0].levels;
      const selectedLevel = sourcelevels.find(x => x.levelId === levelId);
      //camera.id = uuidv1();
      camera.homography = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0
      };
      camera.cameraPoints = cameraPoints;
      camera.floorPlanPoints = floorPlanPoints;
      camera.isActive = true;
      selectedLevel.cameras.push(camera);
      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.enableCamera = function (site, cameraId, levelId) {
  return new Promise((resolve, reject) => {
    if (site && cameraId && levelId) {
      const sourcelevels = site.structure.dataSources[0].levels;
      const selectedLevel = sourcelevels.find(x => x.levelId === levelId);
      const selectedCamera = selectedLevel.cameras.find(x => x.id === cameraId);
      selectedCamera.isActive = !selectedCamera.isActive;
      resolve(site);
    } else {
      reject('Something is null');
    }
  })
}

exports.updateCameraToLevel = function (site, camera, levelId, cameraPoints, floorPlanPoints, homography) {
  const fs = require('fs');
  return new Promise((resolve, reject) => {
    if (site && camera && camera.id && levelId) {
      const sourcelevels = site.structure.dataSources[0].levels;
      const selectedLevel = sourcelevels.find(x => x.levelId === levelId);
      if (floorPlanPoints) {
        camera.floorPlanPoints = floorPlanPoints;
      }
      if (cameraPoints) {
        camera.cameraPoints = cameraPoints;
      }
      camera.homography = homography;

      const selectedCamera = selectedLevel.cameras.find(x => x.id === camera.id);

      selectedCamera.name = camera.name;
      selectedCamera.url = camera.url;

      // check camera image is changed
      if (!camera.image.startsWith('/uploads')) {
        // image is changed
        const resolution = getImageDimensions(camera.image);
        if(resolution) {
          selectedCamera.cam_res_x = resolution.w;
          selectedCamera.cam_res_y = resolution.h;
        }
        try {
          fs.writeFile('./public' + selectedCamera.image, camera.image, {encoding: 'base64'}, function(err) {
            if(err) {
              selectedCamera.camera = '';
              console.log('error');
            } else {
  
            }
          });
        } catch(e) {
          console.log(e);
        }
      }
      //selectedCamera.image = camera.image;
      selectedCamera.type = camera.type;
      selectedCamera.username = camera.username;
      selectedCamera.password = camera.password;
      if (camera.homography) {
        selectedCamera.homography = camera.homography;
      }
      if (cameraPoints) {
        selectedCamera.cameraPoints = cameraPoints;
      }
      if (floorPlanPoints) {
        selectedCamera.floorPlanPoints = floorPlanPoints;
      }
      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.deleteCameraToLevel = function (site, cameraId, levelId) {
  return new Promise((resolve, reject) => {
    if (site && cameraId && levelId) {
      const sourceLevels = site.structure.dataSources[0].levels;
      const selectedLevel = sourceLevels.find(x => x.levelId === levelId);
      const cameraIndex = selectedLevel.cameras.findIndex(x => x.id === cameraId);
      selectedLevel.cameras.splice(cameraIndex, 1);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.addKPI = function (site, kpi) {
  return new Promise((resolve, reject) => {
    if (site) {
      let k = kpi;
      k = {
        id: uuidv1(),
        ...k
      }
      site.structure.dataObjects[2].kpis.push(k);
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
};

exports.updateKPI = function (site, kpi) {
  return new Promise((resolve, reject) => {
    if (site) {
      const { dataObjects } = site.structure;
      const k = dataObjects[2].kpis.find(x => x.id === kpi.id);
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
      const kpis = site.structure.dataObjects[2].kpis;
      const kpiIndex = kpis.findIndex(x => x.id == kpiId);
      kpis.splice(kpiIndex, 1);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

exports.addTrigger = function (site, trigger) {
  return new Promise((resolve, reject) => {
    if (site) {
      site.structure.dataObjects[3].triggers.push(trigger);
      resolve(site);
    } else {
      reject('Site not found');
    }
  });
};

exports.updateTrigger = function (site, trigger) {
  return new Promise((resolve, reject) => {
    if (site) {
      const { dataObjects } = site.structure;
      const t = dataObjects[3].triggers.find(x => x.id === trigger.id);
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
      const triggers = site.structure.dataObjects[3].triggers;
      const triggerIndex = triggers.findIndex(x => x.id == triggerId);
      triggers.splice(triggerIndex, 1);

      resolve(site);
    } else {
      reject('Something is null');
    }
  });
};

