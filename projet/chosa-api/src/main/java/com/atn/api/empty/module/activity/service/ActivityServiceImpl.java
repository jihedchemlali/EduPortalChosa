package com.atn.api.empty.module.activity.service;

import com.atn.api.empty.module.activity.entity.Activity;
import com.atn.api.empty.module.activity.persistence.ActivityDao;
import com.atn.api.empty.module.file.entity.File;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ActivityServiceImpl extends MyAbstractService <Activity , Long> implements ActivityService {

    public ActivityServiceImpl(ActivityDao activityDao) {
        super(activityDao);
    }

    @Override
    protected ActivityDao getDataAccessObject() {
        return (ActivityDao) this.dataAccessObject;
    }

}
