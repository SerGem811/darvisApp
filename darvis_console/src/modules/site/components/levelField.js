import React from 'react';
import { Col, Row, CustomInput } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import HrDivider from '../../../shared/atoms/hrDivider';
import styles from '../styles.module.scss';

const LevelField = ({ site, 
                      index, 
                      levelDetail, 
                      updateLevel, 
                      deleteLevel, 
                      addZone, 
                      updateZone, 
                      deleteZone, 
                      enableCamera}) => {
  const renderZone = () => {
    return (
      <React.Fragment>
        {(levelDetail && levelDetail.zones && levelDetail.zones.length > 0) && (
          levelDetail.zones.map(z => (
            <Row key={z.id} className='p-t-5'>
              <Col key={z.name} md={6}>
                <span className='p-l-20'>{z.name}</span>
              </Col>
              <Col md={{ size: 4, offset: 2 }}>
                <button className={`${styles.blue} p-r-5`} type="button" onClick={() => updateZone(z)}>
                  <FontAwesomeIcon size="sm" icon="pen" />
                </button>
                <button className={`${styles.times}`} type="button" onClick={() => deleteZone(z)}>
                  <FontAwesomeIcon size="sm" icon="times" />
                </button>
              </Col>
            </Row>
          ))
        )}
        <Row className='p-t-5'>
          <Col md={12} className='p-l-30'>
            <button className={styles.blue} type="button" onClick={() => addZone()}>
              <FontAwesomeIcon size="1x" icon="plus-circle" />
              <span className="p-l-5">Add new zone</span>
            </button>
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const renderCamera = level => {
    return (
      <React.Fragment>
        {(level && level.cameras && level.cameras.length > 0) && (
          level.cameras.map(camera => (
            <Row key={camera.id} className='p-t-5'>
              <Col md={12} className='p-l-20'>
                <CustomInput
                  type="switch"
                  name="status"
                  id={camera.id}
                  className={styles.switch}
                  label={camera.name}
                  defaultChecked={camera.isActive}
                  onChange={() => { enableCamera(level.levelId, camera.id) }}
                />
              </Col>
            </Row>
          ))
        )}
      </React.Fragment>
    );
  };

  const getLevel = (id) => {
    try {
      const l = site.structure.dataSources[0].levels.find(l => l.levelId === id);
      return l;
    } catch (e) {
      return undefined;
    }
  }

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <HrDivider bold={false} color="#72a7e0" />
        </Col>
      </Row>
      <Row>
        <Col md={1} className='p-l-20'>{index}</Col>
        <Col md={3} className={`${styles.level}`}>
          <span>{levelDetail.name}</span>
        </Col>
        <Col md={2} className={`${styles.level}`}>
          {levelDetail.levelType || 'Floor Plan'}
        </Col>
        <Col md={2} className={`${styles.number}`}>
          {levelDetail.zones.length}
        </Col>
        <Col md={2} className={`${styles.number}`}>
          {getLevel(levelDetail.id).cameras.length}
        </Col>
        <Col md={2} className={`${styles.level} p-r-20`}>
          <span className={`${styles.levelIcons}`}>
            <button className={`${styles.blue} p-r-10`} type="button" onClick={() => updateLevel(levelDetail)}>
              <FontAwesomeIcon size="sm" icon="pen" />
            </button>
            <button className={`${styles.times} p-r-10`} type="button" onClick={() => deleteLevel(levelDetail)}>
              <FontAwesomeIcon size="sm" icon="times" />
            </button>
          </span>
        </Col>
      </Row>
      <Row>
        <Col md={7} className='p-t-10'>{renderZone()}</Col>
        <Col md={5} className='p-t-10'>{renderCamera(getLevel(levelDetail.id))}</Col>
      </Row>
    </React.Fragment>
  );
};

LevelField.defaultProps = {
  updateLevel: () => { },
  deleteLevel: () => { },
  addZone: () => { },
  updateZone: () => { },
  deleteZone: () => { },
  addCamera: () => { },
  updateCamera: () => { },
  deleteCamera: () => { }
};

export default LevelField;
