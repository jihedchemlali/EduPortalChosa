package com.atn.api.empty.module.trainingCenter.service;


import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.trainingCenter.persistence.TrainingCenterDao;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class TrainingCenterServiceImpl extends MyAbstractService<TrainingCenter, Long> implements TrainingCenterService {

    public TrainingCenterServiceImpl(TrainingCenterDao trainingCenterDao){super(trainingCenterDao);
    }

    @Override
    protected TrainingCenterDao getDataAccessObject() {
        return (TrainingCenterDao) this.dataAccessObject;
    }

}
