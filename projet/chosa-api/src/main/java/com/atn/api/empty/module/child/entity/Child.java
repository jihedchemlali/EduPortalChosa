package com.atn.api.empty.module.child.entity;

import com.atn.api.empty.module.actualityChild.entity.ActualityChild;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.trainingCenter.entity.TrainingCenter;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.entities.ModelObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;


@Entity
@Data
@Table(name = "APP_CHILD", uniqueConstraints = @UniqueConstraint(columnNames = "CHILD_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Inheritance(strategy = InheritanceType.JOINED)
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
public class Child extends ModelObject<Long> {

    public enum SEXE {
        GARCON("GARCON"), FILLE("FILLE");
        protected String value;

        SEXE(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    public enum STATUS {
        ACCEPTED("ACCEPTED"),
        ONLOAD("ONLOAD"),
        IGNORED("IGNORED"),
        REFUSED("REFUSED"),
        NEW("NEW");
        protected String value;

        STATUS(String value) {
            this.value = value;
        }

        @Override
        public String toString() {
            return value;
        }
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CHILD_ID", unique = true, nullable = false)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PARENT_USER_ID_FK")
    private User parent;

    @Column(name = "PRENOM")
    private String prenom;

    @Column(name = "CODE")
    private String code;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PICTURE_ID_FK")
    private File picture;

    @Column(name = "BIRTH_DATE")
    private Date birth_date;

    @Enumerated(EnumType.STRING)
    @Column(name = "SEXE")
    private SEXE sexe;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private STATUS status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAINING_CENTER_ID_FK")
    private TrainingCenter trainingCenter;

    @OneToMany(mappedBy = "child", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @Where(clause = "DELETING_DATE is NULL")
    private Set<ActualityChild> actualites;

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id, parent);
    }

    @Override
    public String toString() {
        return "Child{ }";
    }
}
