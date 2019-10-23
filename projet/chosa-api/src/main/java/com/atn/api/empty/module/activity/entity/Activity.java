package com.atn.api.empty.module.activity.entity;

import com.atn.api.empty.module.file.entity.File;
import com.atn.commons.entities.ModelObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "APP_ACTIVITY" , uniqueConstraints = @UniqueConstraint(columnNames = "ACTIVITE_ID"))
@Where(clause = "DELETING_DATE is NULL")
@Data
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
public class Activity extends ModelObject<Long> {
    public enum STATUS {

        DRAFT("DRAFT"), PUBLIC("PUBLIC");

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
    @Column(name = "ACTIVITE_ID", unique = true, nullable = false)
    private Long id;

    @Column(name = "AGE")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private Activity.STATUS status;

    @Column(name = "DATE_PUBLICATION")
    private Date date_publication;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "FILE_ID_FK")
    private File file;
}
