package com.atn.api.empty.module.activity.persistence.jpa;


import com.atn.api.empty.module.activity.entity.Activity;
import com.atn.api.empty.module.activity.persistence.ActivityDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

@Component
public class ActivityDaoJpa extends BaseDaoJpa <Activity, Long> implements ActivityDao {

    public ActivityDaoJpa() {super(Activity.class);
    }
}
