package com.atn.api.empty.module.user.persistence.jpa;

import com.atn.api.empty.module.user.entity.User;
import com.atn.api.empty.module.user.persistence.UserDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;

@Component
public class UserDaoJpa extends BaseDaoJpa<User, Long> implements UserDao {

    public UserDaoJpa() {
        super(User.class);
    }
}
