package com.atn.api.empty.module.role.entity;

import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.entities.ModelObject;
import lombok.Data;
import org.hibernate.annotations.Where;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.Objects;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "APP_ROLE", uniqueConstraints = @UniqueConstraint(columnNames = "ROLE_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Role extends ModelObject<Long> implements GrantedAuthority {

    public enum ROLE {

        ADMIN("ROLE_ADMIN"), PARENT("ROLE_PARENT"),FORMATION("ROLE_FORMATION");

        protected String value;

        ROLE(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "ROLE_ID" , unique = true,nullable = false)
    private Long id;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID_FK")
    private User user;
    //compagny


    @Enumerated(EnumType.STRING)
    @Column(name = "ROLE")
    private ROLE role;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(id, role.id);
    }


    @Override
    public int hashCode() {
        return Objects.hash(id);
    }


    @Override
    public String getAuthority() {
        return this.role.value;
    }


}
