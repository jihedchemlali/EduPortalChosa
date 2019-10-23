package com.atn.api.empty.module.actualityChild.service;

import com.atn.api.empty.module.actualityChild.entity.ActualityChild;
import com.atn.api.empty.module.actualityChild.persistence.ActualityChildDao;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ActualityChildServiceImpl extends MyAbstractService<ActualityChild, Long> implements ActualityChildService {


    public ActualityChildServiceImpl(ActualityChildDao dataAccessObject) {
        super(dataAccessObject);
    }

    @Override
    protected ActualityChildDao getDataAccessObject() {
        return (ActualityChildDao) this.dataAccessObject;
    }
}
