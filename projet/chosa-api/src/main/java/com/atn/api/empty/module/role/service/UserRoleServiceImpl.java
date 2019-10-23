package com.atn.api.empty.module.role.service;

import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.role.persistence.UserRoleDao;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.persistence.BaseDao;
import com.atn.commons.service.MyAbstractService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class UserRoleServiceImpl extends MyAbstractService<Role, Long> implements UserRoleService {

    public UserRoleServiceImpl(UserRoleDao userRoleDao) {
        super(userRoleDao);
    }

    @Override
    protected UserRoleDao getDataAccessObject() {
        return (UserRoleDao) this.dataAccessObject;
    }
}
