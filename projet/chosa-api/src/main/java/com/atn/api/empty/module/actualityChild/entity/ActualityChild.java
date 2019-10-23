package com.atn.api.empty.module.actualityChild.entity;


import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.entities.ModelObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Objects;


@Entity
@Table(name = "APP_ACTUALITY_CHILD", uniqueConstraints = @UniqueConstraint(columnNames = "ACTUALITY_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
public class ActualityChild extends ModelObject<Long> {
    public enum TYPE {
        INFO("INFO"), ATTENTION("ATTENTION"), ACTIVITE("ACTIVITE");
        protected String value;

        TYPE(String value) {
            this.value = value;
        }
    }
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACTUALITY_ID", unique = true, nullable = false)
    private Long id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER, targetEntity = File.class)
    @JoinColumn(name = "FILE_ID_FK")
    private File file;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "USER_ID_FK")
    @Where(clause = "DELETING_DATE is NULL")
    private User user;

    @Column(name = "COMMENTAIRE")
    private String commentaire;

    @Column(name = "LONGITUDE")
    private String longitude;

    @Column(name = "LATITUDE")
    private String latitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "TYPE")
    private TYPE type;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Child.class)
    @JoinColumn(name = "CHILD_ID_FK")
    @Where(clause = "DELETING_DATE is NULL")
    private Child child;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        ActualityChild that = (ActualityChild) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }

    @Override
    public String toString() {
        return "ActualityChild{}";
    }
}
