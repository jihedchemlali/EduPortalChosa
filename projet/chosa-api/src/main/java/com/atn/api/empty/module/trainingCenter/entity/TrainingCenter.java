package com.atn.api.empty.module.trainingCenter.entity;



import com.atn.api.empty.module.child.entity.Child;
import com.atn.api.empty.module.file.entity.File;
import com.atn.api.empty.module.user.entity.User;
import com.atn.commons.entities.ModelObject;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "APP_TRAINING_CENTER", uniqueConstraints = @UniqueConstraint(columnNames = "CENTER_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Data
public class TrainingCenter extends ModelObject<Long> {
    public enum STATUS {

        REQUEST("REQUEST"), SUSPENDED("SUSPENDED"), VALIDATE("VALIDATE");

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
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "CENTER_ID", unique = true, nullable = false)
    private Long id;

    @Column(name = "CENTER_NAME")
    private String name;

    @OneToOne(fetch = FetchType.EAGER, targetEntity = File.class)
    @JoinColumn(name = "LOGO_FILE_ID_FK")
    private File logo;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MANAGER_USER_ID_FK", unique = true)
    private User manager;

    @Column(name = "ADDRESS")
    private String address;

    @Column(name = "VILLE")
    private String ville;

    @Column(name = "COUNTRY")
    private String country;

    @Column(name = "PHONE")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private STATUS status;

    @Column(name = "FOUNDATIONDAY")
    private Date foundationDay;

    @OneToMany(mappedBy = "trainingCenter", fetch = FetchType.LAZY)
    @Where(clause = "DELETING_DATE is NULL")
    private Set<Child> children;

    @Override
    public String toString() {
        return "TrainingCenter{" +
                "id=" + id ;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        TrainingCenter that = (TrainingCenter) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), id);
    }
}
