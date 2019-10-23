package com.atn.api.empty.module.child.persistence.jpa;

import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.child.persistence.ChildDao;
import com.atn.commons.persistence.jpa.BaseDaoJpa;
import org.springframework.stereotype.Component;

@Component
public class ChildDaoJpa extends BaseDaoJpa<Child, Long> implements ChildDao {
    public ChildDaoJpa() {
        super(Child.class);
    }
}
