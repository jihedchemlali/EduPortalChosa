package com.atn.api.empty.module.role.persistence.jpa;

import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.role.persistence.UserRoleDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

@Component
public class UserRoleDaoJpa extends BaseDaoJpa<Role, Long> implements UserRoleDao {

    public UserRoleDaoJpa() {
        super(Role.class);
    }
}
