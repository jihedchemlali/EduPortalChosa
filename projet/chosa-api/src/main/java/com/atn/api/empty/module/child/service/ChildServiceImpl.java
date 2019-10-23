package com.atn.api.empty.module.child.service;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.child.persistence.ChildDao;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.service.UserService;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Component
public class ChildServiceImpl extends MyAbstractService<Child, Long> implements ChildService {

    public ChildServiceImpl(ChildDao childDao) {
        super(childDao);
    }

    @Override
    protected ChildDao getDataAccessObject() {
        return (ChildDao) this.dataAccessObject;
    }
}
