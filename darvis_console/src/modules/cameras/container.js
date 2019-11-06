import React, { useContext, useState } from 'react';
import { Row, Col, Button, Modal } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uuidv1 from 'uuid';

import DashboardTemplate from '../../shared/templates/dashboardTemplate';
import SitesContext from '../../shared/modules/sitesContext/context';
import ErrorContext from '../../shared/modules/error/context';
import ConfirmationContext from '../../shared/modules/confirmationModal/context';

import Card from '../../shared/molecules/card';
import HrDivider from '../../shared/atoms/hrDivider';
import CameraModel from './components/cameraModal';

import {
  addCameraToSite,
  updateCameraToSite,
  deleteCameraFromLevel,
  getSitesbyUser as callSite,
} from '../../shared/services/sites';


const CamerasContainer = ({ history }) => {
  const { setError } = useContext(ErrorContext);

  const [modalState, setModalState] = useState({
    levelId: '',
    camera: {},
    visible: false
  });

  const toggleModal = (levelId, camera) => {
    setModalState({
      ...modalState,
      levelId,
      camera,
      visible: !modalState.visible
    });
  };

  const dismiss = () => {
    setModalState({
      levelId: '',
      camera: {},
      visible: false
    });
  };

  return (
    <DashboardTemplate>
      <SitesContext.Consumer>
        {props => {
          const { selectedSite, reloadSites, setSelectedSite } = props;
          if (!selectedSite) {
            return (
              <Row className='m-t-30'>
                <h2 className='m-l-30' style={{ position: 'absolute', bottom: 0 }}>
                  Site not found
                </h2>
              </Row>
            )
          } else {
            const levels = selectedSite.structure.dataSources[0].levels;
            let index = 0;
            const addCamera = async (levelId, camera, cb, errcb) => {
              try {
                camera.id = uuidv1();
                await addCameraToSite(selectedSite._id, camera, levelId);
                if (cb) { cb(); }
                dismiss();
                let user = localStorage.getItem('user') || {};
                if (user) {
                  user = JSON.parse(user);
                }
                const site1 = await callSite(user._id);
                localStorage.setItem('selectedSite', JSON.stringify(site1[0]));
                history.push(`/console/site/homography/${levelId}/${camera.id}`);
              } catch (e) {
                if (errcb) { errcb(); }
                setError(e, true);
              }
            }
            const updateCamera = async (levelId, camera, cb, errcb) => {
              try {
                const updatedSite = await updateCameraToSite(selectedSite._id, camera, levelId, camera.cameraPoints, camera.floorPlanPoints);
                if (cb) { cb(); }
                dismiss();
                reloadSites();
              } catch (e) {
                if (errcb) { errcb(); }
                setError(e, true);
              }
            }
            const deleteCamera = async (levelId, cameraId, cb, errcb) => {
              try {
                await deleteCameraFromLevel(selectedSite._id, cameraId, levelId);
                if (cb) { cb(); }
                reloadSites();
              } catch (e) {
                if (errcb) { errcb(); }
                setError(e, true);
              }
            }
            const editPoint = async (levelId, cameraId) => {
              try {
                history.push(`/console/site/homography/${levelId}/${cameraId}`);
              } catch (e) {
                setError(e, true);
              }
            }
            return (
              <React.Fragment>
                <Row>
                  <Col md={10}>
                    <h2 className='m-l-30'>Cameras</h2>
                  </Col>
                  <Col md={2}>
                    <Button className='green-button float-r m-r-10' onClick={() => { toggleModal('', undefined) }}>Add camera</Button>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Card className='m-t-15 pd-10'>
                      <Row>
                        <Col md={1}>
                          <strong className='p-l-5'>No</strong>
                        </Col>
                        <Col md={3}>
                          <strong>Name of level</strong>
                        </Col>
                        <Col md={3}>
                          <strong>Name of camera</strong>
                        </Col>
                        <Col md={2}>
                          <strong>Type</strong>
                        </Col>
                        <Col md={2}>
                          <strong>Status</strong>
                        </Col>
                        <Col md={1} style={{ textAlign: 'center' }}>
                          <strong>#</strong>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <HrDivider bold={false} color='#72a7e0' />
                        </Col>
                      </Row>
                      {levels && levels.length > 0 && levels.map(item => (
                        <React.Fragment key={item.levelId}>
                          {item.cameras && item.cameras.map(c => {
                            index++;
                            return (
                              <Row key={c.id} className='m-t-5'>
                                <Col md={1}><span className='p-l-5'>{index}</span></Col>
                                <Col md={3}>{item.name}</Col>
                                <Col md={3}>{c.name}</Col>
                                <Col md={2}>{c.type}</Col>
                                <Col md={2}>{c.isActive ? 'On' : 'Off'}</Col>
                                <Col md={1}>
                                  <button className='blue-color p-r-5' type="button" onClick={() => { toggleModal(item.levelId, c) }}>
                                    <FontAwesomeIcon size="sm" icon="pen" />
                                  </button>
                                  <button className='blue-color p-r-5' type="button" onClick={() => { editPoint(item.levelId, c.id) }}>
                                    <FontAwesomeIcon size="sm" icon="cog" />
                                  </button>
                                  <ConfirmationContext.Consumer>
                                    {({ setConfirmationModal, resetConfirmationModal, setLoader }) => (
                                      <button
                                        className='times-color'
                                        type="button"
                                        onClick={() => {
                                          setConfirmationModal(s => ({
                                            ...s,
                                            visible: true,
                                            item: c.name,
                                            callback: () => {
                                              setLoader(true);
                                              deleteCamera(item.levelId, c.id, () => resetConfirmationModal(), () => setLoader(false));
                                            }
                                          }))
                                        }}>
                                        <FontAwesomeIcon size="sm" icon="times" />
                                      </button>
                                    )}
                                  </ConfirmationContext.Consumer>

                                </Col>
                              </Row>
                            )
                          })}

                        </React.Fragment>
                      ))}
                      {(index === 0) && (
                        <Row>
                          <Col md={12}>
                            <span className='m-l-30'>No camera found</span>
                          </Col>
                        </Row>
                      )}
                    </Card>
                  </Col>
                </Row>
                {modalState.visible && (
                  <Modal
                    isOpen={modalState.visible}
                    toggle={() => dismiss()}
                    style={{ maxWidth: '450px' }}
                    className='darvis-modal-top'
                  >
                    <CameraModel
                      levelId={modalState.levelId}
                      camera={modalState.camera}
                      levels={levels}
                      addCamera={addCamera}
                      updateCamera={updateCamera}
                      dismiss={dismiss}
                    />
                  </Modal>
                )}
              </React.Fragment>
            )
          }
        }}

      </SitesContext.Consumer>
    </DashboardTemplate>
  );
};

export default CamerasContainer;
