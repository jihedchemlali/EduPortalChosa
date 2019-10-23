package com.atn.api.empty.module.user.entity;


import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.notification.entity.Notification;
import com.atn.api.empty.module.role.entity.Role;
import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.commons.entities.ModelObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "APP_USER", uniqueConstraints = @UniqueConstraint(columnNames = "USER_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@ToString(exclude = {"roles", "children", "user_picture_file"})
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
public class User extends ModelObject<Long> {


    public enum STATUS {
        SIGNUP("SIGNUP"), VALIDATE("VALIDATE"), SUSPENDED("SUSPENDED");
        protected String value;

        STATUS(String value) {
            this.value = value;
        }
    }

    public boolean hasRole(Role.ROLE role) {
        for (Role role2 : roles) {
            if (role2.getRole().equals(role)) {
                return true;
            }
        }
        return false;
    }

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "USER_ID", unique = true, nullable = false)
    private Long id;

    @Column(name = "NOM")
    private String nom;

    @Column(name = "PRENOM")
    private String prenom;

    @Column(name = "EMAIL")
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private STATUS status;

    @Column(name = "USER_PASSWORD")
    private String userPassword;

    @Column(name = "BIRTH_DATE")
    private Date birth_date;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_PICTURE_FILE")
    @Where(clause = "DELETING_DATE is NULL")
    private File user_picture_file;

    @Column(name = "ADDRESS")
    private String adress;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "VILLE")
    private String ville;

    @Column(name = "PHONE")
    private String phone;

    @Column(name = "GOOGLE_ID")
    private String google_Id;

    @Column(name = "FACEBOOK_ID")
    private String facebook_Id;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "manager")
    @JsonIgnore
    @Where(clause="DELETING_DATE is NULL")
    private TrainingCenter trainingCentre;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Role> roles;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
    @JsonIgnore
    @Where(clause = "DELETING_DATE is NULL")
    private Set<Child> children;

    @OneToMany(mappedBy = "destination", fetch = FetchType.LAZY)
    @JsonIgnore
    @Where(clause = "DELETING_DATE is NULL")
    private Set<Notification> notifications;

    public String getToken() {
        String token = "XXXXXXXXXXXXXXX";
        if (getUpdatingDate() != null) {
            token = getUpdatingDate().getTime() + "";
            token = token.substring(0, 9);
        }
        return token;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
