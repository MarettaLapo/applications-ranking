package ru.isu.restfirst.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.isu.restfirst.model.AdminPanel;
import ru.isu.restfirst.model.UserInfo;

import java.time.LocalDate;

@Repository
public interface AdminPanelRepository extends JpaRepository<AdminPanel, Long> {
    @Query("select a.endDate from AdminPanel a where a.now = true")
    LocalDate findEndDate();

    @Query("select a.approveCount from AdminPanel a where a.now = true")
    Integer findApplicationCount();

    AdminPanel findAllByNowIsTrue();
}
