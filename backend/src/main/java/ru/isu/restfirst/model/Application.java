package ru.isu.restfirst.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@ToString
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "user_info_id")
    private UserInfo user_info;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "filing_date")
    private LocalDate filing_date;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "end_date")
    private LocalDate end_date;

    @Column(name = "is_approved")
    private Boolean is_approved;

    @Column(name = "rank")
    private Long rank;

    public Application(User user, UserInfo user_info, LocalDate filing_date, LocalDate end_date,Boolean is_approved, Long rank) {
        this.user = user;
        this.user_info = user_info;
        this.filing_date = filing_date;
        this.end_date = end_date;
        this.is_approved = is_approved;
        this.rank = rank;
    }
}
