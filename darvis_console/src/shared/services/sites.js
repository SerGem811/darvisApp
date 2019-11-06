import API from '../../api';
import { SITES, USERS } from '../../api/endpoints';

export async function getSitesbyUser(userId) {
  const api = new API();
  return api.get(`${USERS}/${userId}/site`).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function getSites() {
  const api = new API();
  return api.get(SITES).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function getSite(id) {
  const api = new API();
  return api.get(SITES, id).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addSite(site) {
  const api = new API();
  return api.post(SITES, site).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function generateJson(siteId) {
  const api = new API();
  return api.get(`${SITES}/dataworldjson`, siteId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function restartAI(siteId) {
  const api = new API();
  return api.get(`${SITES}/restartAI`, siteId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addLevel(siteId, level) {
  const api = new API({
    headers: { contentType: 'multipart/form-data' },
  });

  const formData = new FormData();

  formData.append('plan', level.plan);
  formData.append('name', level.name);
  formData.append('vtype', level.vtype);
  formData.append('image', level.image);

  return api.post(`${SITES}/${siteId}/addLevel`, formData).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function updateLevel(siteId, level) {
  const api = new API({
    headers: { contentType: 'multipart/form-data' },
  });

  const formData = new FormData();
  formData.append('level_id', level.id);
  formData.append('plan', level.plan);
  formData.append('name', level.name);
  formData.append('image', level.image);

  return api.put(`${SITES}/${siteId}/updateLevel`, formData).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function deleteLevelFromSite(siteId, levelId) {
  const api = new API();
  return api.delete(`${SITES}/${siteId}/deleteLevel`, levelId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addZone(siteId, params) {
  const api = new API();
  return api.post(`${SITES}/${siteId}/addZone`, params).then(
    res => res.data,
    error => {
      throw error;
    }
  );
  // return siteId + level + zone;
}

export async function updateZone(siteId, params) {
  const api = new API();
  return api.put(`${SITES}/${siteId}/updateZone`, params).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function deleteZoneFromLevel(siteId, zoneId, levelId) {
  const api = new API();
  return api.delete(`${SITES}/${siteId}/deleteZone/${zoneId}`, levelId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addCameraToSite(siteId, camera, levelId /* , cameraPoints, floorPlanPoints */) {
  const api = new API();
  return api
    .post(`${SITES}/${siteId}/addCamera`, {
      siteId,
      camera,
      levelId,
      // cameraPoints,
      // floorPlanPoints
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function updateCameraToSite(siteId, camera, levelId, cameraPoints, floorPlanPoints, homography) {
  const api = new API();
  return api
    .put(`${SITES}/${siteId}/updateCamera`, {
      siteId,
      camera,
      levelId,
      cameraPoints,
      floorPlanPoints,
      homography,
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function enableCamera(siteId, cameraId, levelId) {
  const api = new API();
  return api
    .put(`${SITES}/${siteId}/enableCamera`, {
      siteId,
      cameraId,
      levelId,
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function deleteCameraFromLevel(siteId, cameraId, levelId) {
  const api = new API();
  return api.delete(`${SITES}/${siteId}/deleteCamera/${cameraId}`, levelId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function addKPI(siteId, kpi) {
  const api = new API();
  return api
    .post(`${SITES}/${siteId}/addKPI`, {
      siteId,
      kpi,
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function updateKPI(siteId, kpi) {
  const api = new API();
  return api
    .put(`${SITES}/${siteId}/updateKPI`, {
      kpi,
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function deleteKPI(siteId, kpiId) {
  const api = new API();
  return api.delete(`${SITES}/${siteId}/deleteKPI`, kpiId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

// trigger
export async function addTrigger(siteId, trigger) {
  const api = new API();
  return api
    .post(`${SITES}/${siteId}/addTrigger`, {
      siteId,
      trigger
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function updateTrigger(siteId, trigger) {
  const api = new API();
  return api
    .put(`${SITES}/${siteId}/updateTrigger`, {
      trigger
    })
    .then(
      res => res.data,
      error => {
        throw error;
      }
    );
}

export async function deleteTrigger(siteId, triggerId) {
  const api = new API();
  return api.delete(`${SITES}/${siteId}/deleteTrigger`, triggerId).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function updateSite(site, id) {
  const api = new API();
  return api.put(`${SITES}/${id}`, site).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function deleteSite(id) {
  const api = new API();
  return api.delete(SITES, id).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function registerPrem(prem) {
  const api = new API();
  return api.post(`${SITES}/registerPrem`, prem).then(
    res => res.data,
    error => {
      throw error;
    }
  );
}

export async function isRegistered() {
  const api = new API();
  return api.post(`${SITES}/isRegistered`, '').then(
    res => res.data,
    error => {
      throw error;
    }
  );
}