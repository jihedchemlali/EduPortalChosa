package com.atn.api.empty.module.trainingCenter.persistence.jpa;

import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.trainingCenter.persistence.TrainingCenterDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

@Component
public class TrainingCenterDaoJpa extends BaseDaoJpa <TrainingCenter, Long> implements TrainingCenterDao {
    public TrainingCenterDaoJpa() {
        super(TrainingCenter.class);
    }
}
