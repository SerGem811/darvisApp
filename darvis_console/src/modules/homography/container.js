import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button, Spinner } from 'reactstrap';

import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import { ORIGIN } from '../../config';
import PointCanvas from '../../shared/molecules/canvas/pointCanvas';
import styles from './styles.module.scss';
import { updateCameraToSite } from '../../shared/services/sites';
import getHomography from './service';

const HomographyContainer = props => {
  const site = JSON.parse(localStorage.getItem('selectedSite'));

  function getLevel() {
    if (props.match.params && props.match.params.levelId) {
      return site.levels.find(l => l._id === props.match.params.levelId) || {};
    }
    return {};
  }
  const [level] = useState(getLevel());

  function getSorted(pts) {
    debugger;
    const ptsArr = [];
    ptsArr.push(pts.p1);
    ptsArr.push(pts.p2);
    ptsArr.push(pts.p3);
    ptsArr.push(pts.p4);

    ptsArr.sort((a,b) => (a.x + a.y) - (b.x + b.y));
    // top left
    const tl = ptsArr[0];
    const br = ptsArr[3];
    ptsArr.sort((a,b) => (a.x - a.y) - (b.x - b.y));
    const bl = ptsArr[0];
    const tr = ptsArr[3];
    
    return {p1: tl, p2: tr, p3: br, p4: bl};
  }

  function getCamera() {
    if (props.match.params && props.match.params.cameraId) {
      return site.cameras.find(c => c._id === props.match.params.cameraId) || {};
    }
    return {};
  }
  const [camera] = useState(getCamera());

  const [siteId] = useState(site._id);

  const cameraRef = useRef(null);
  const floorRef = useRef(null);

  function getPoints(xRatio, yRatio, pt) {
    if (pt) {
      return {
        p1: { x: pt.p1.x * xRatio, y: pt.p1.y * yRatio },
        p2: { x: pt.p2.x * xRatio, y: pt.p2.y * yRatio },
        p3: { x: pt.p3.x * xRatio, y: pt.p3.y * yRatio },
        p4: { x: pt.p4.x * xRatio, y: pt.p4.y * yRatio },
      };
    }
    return {
      p1: { x: 0.3 * xRatio, y: 0.3 * yRatio },
      p2: { x: 0.5 * xRatio, y: 0.3 * yRatio },
      p3: { x: 0.5 * xRatio, y: 0.5 * yRatio },
      p4: { x: 0.3 * xRatio, y: 0.5 * yRatio },
    };
  }

  const [cameraPoints, setCameraPoints] = useState();

  function getCamerasPoint() {
    const points = [];

    const cameras = site.cameras.filter(x => x.levelId === level._id);
    if (cameras) {
      cameras.forEach(item => {
        if (item.id !== camera.id && item.floorPlanPoints) {
          points.push({ isActive: item.isActive, points: item.floorPlanPoints });
        }
      });
    }
    return points;
  }

  const [camerasValue] = useState(getCamerasPoint());

  useEffect(() => {
    if (cameraRef.current && camera) {
      const xRatio = cameraRef.current.clientWidth;
      const yRatio = cameraRef.current.clientHeight;
      setCameraPoints(
        camera && camera.cameraPoints
          ? getPoints(xRatio, yRatio, camera.cameraPoints)
          : getPoints(xRatio, yRatio, undefined)
      );
    }
  }, [cameraRef.current, camera]);

  const [floorPlanPoints, setFloorPlanPoints] = useState();
  useEffect(() => {
    if (floorRef.current && camera) {
      const xRatio = floorRef.current.clientWidth;
      const yRatio = floorRef.current.clientHeight;
      setFloorPlanPoints(
        camera && camera.floorPlanPoints
          ? getPoints(xRatio, yRatio, camera.floorPlanPoints)
          : getPoints(xRatio, yRatio, undefined)
      );
    }
  }, [floorRef.current, camera]);

  const [floorZoomRate, setFloorZoomRate] = useState(1);
  const [cameraZoomRate, setCameraZoomRate] = useState(1);

  const updateCameraPoints = pos => {
    const newPoints = { ...cameraPoints };
    newPoints[pos.key] = { x: pos.x, y: pos.y };
    setCameraPoints({
      ...newPoints,
    });
  };

  const updateFloorPoints = pos => {
    const newPoints = { ...floorPlanPoints };
    newPoints[pos.key] = { x: pos.x, y: pos.y };
    setFloorPlanPoints({
      ...newPoints,
    });
  };

  const updateCameraZoomRate = rate => {
    setCameraZoomRate(rate);
  };

  const updateFloorZoomRate = rate => {
    setFloorZoomRate(rate);
  };

  async function savePoints() {
    if (camera && level) {
      let cpoints = { ...cameraPoints };
      let fpoints = { ...floorPlanPoints };

      if (!cameraRef.current || !floorRef.current) {
        // error case
      } else {
        const cameraWidth = cameraRef.current.clientWidth;
        const cameraHeight = cameraRef.current.clientHeight;

        Object.keys(cameraPoints).forEach(item => {
          cpoints[item].x = parseFloat(cameraPoints[item].x / (cameraWidth * cameraZoomRate));
          cpoints[item].y = parseFloat(cameraPoints[item].y / (cameraHeight * cameraZoomRate));
        });

        const floorWidth = floorRef.current.clientWidth;
        const floorHeight = floorRef.current.clientHeight;

        Object.keys(floorPlanPoints).forEach(item => {
          fpoints[item].x = parseFloat(floorPlanPoints[item].x / (floorWidth * floorZoomRate));
          fpoints[item].y = parseFloat(floorPlanPoints[item].y / (floorHeight * floorZoomRate));
        });
      }

      // points ordering
      cpoints = getSorted(cpoints);
      fpoints = getSorted(fpoints);

      const homography = await getHomography(cpoints, fpoints);

      if (!homography || homography === 'error') {
        // show error
      } else {
        //homography.homography_points[8] = 1;
        await updateCameraToSite(siteId, camera, cpoints, fpoints, homography.homography_points);
      }
      // redirect
      props.history.goBack();
    }
  }

  function cancelPoints() {
    props.history.goBack();
  }

  return (
    <DashboardTemplate>
      {camera && level ? (
        <React.Fragment>
          <Row className="m-b-10">
            <Col md={4}>
              <h4 className="m-l-50">{level && `Level : ${level.name}`}</h4>
            </Col>
            <Col md={4}>
              <h4 className="m-l-50">{level && `Camera : ${camera.name}`}</h4>
            </Col>
            <Col md={4}>
              <div style={{ float: 'right' }}>
                <h5>{}</h5>
                <Button color="success" onClick={savePoints}>
                  Done
                </Button>
                <Button color="success" className="m-l-10" onClick={cancelPoints}>
                  Cancel
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div ref={floorRef} className={`${styles.plan_floor_height} darvis-border darvis-canvas-wrapper`}>
                {floorRef.current && camera && level.plan && (
                  <PointCanvas
                    key={level._id}
                    points={floorPlanPoints} // points for the floor
                    camerasPoints={camerasValue} // other cameras points
                    updatePoints={updateFloorPoints} // get updated points from canvas
                    updateZoomRate={updateFloorZoomRate} // get zoom rate from canvas
                    canvasWidth={floorRef.current.clientWidth} // initial canvas width
                    canvasHeight={floorRef.current.clientHeight} // initial canvas height
                    imagePath={ORIGIN + level.plan} // level image path
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row className="m-t-10">
            <Col md={12}>
              <div ref={cameraRef} className={`${styles.plan_camera_height} darvis-border darvis-canvas-wrapper`}>
                {cameraRef.current && camera && camera.image && (
                  <PointCanvas
                    key={camera._id}
                    points={cameraPoints}
                    updateZoomRate={updateCameraZoomRate}
                    updatePoints={updateCameraPoints}
                    canvasWidth={cameraRef.current.clientWidth}
                    canvasHeight={cameraRef.current.clientHeight}
                    imagePath={ORIGIN + camera.image}
                  />
                )}
              </div>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Spinner />
      )}
    </DashboardTemplate>
  );
};

export default HomographyContainer;
