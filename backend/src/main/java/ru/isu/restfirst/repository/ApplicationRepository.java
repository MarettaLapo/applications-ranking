package ru.isu.restfirst.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.isu.restfirst.model.Application;
import ru.isu.restfirst.model.Disability;
import ru.isu.restfirst.model.FamilyCircumstances;

import java.time.LocalDate;
import java.util.List;

@Repository
@Transactional
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    @Query("select a from Application a where a.is_approved = false " +
            "and a.end_date = ?1 order by a.rank DESC")
    public List<Application> findAllOrderByRank(LocalDate endDate);

    @Query("select a from Application a where a.user.id = ?1 order by a.end_date DESC")
    public  List<Application> findApplicationsByUserId(Long userId);
    @Query("select a from Application a where a.is_approved = true " +
            "and a.end_date = ?1 order by a.rank DESC")
    public List<Application> findApprovedOrderByRank(LocalDate date);

    @Modifying
    @Query("update Application a set a.rank = ?1 WHERE a.id = ?2")
    public int updateRankApplication(Long rank, Long applicationId);

    @Modifying
    @Query("update Application a set a.is_approved = true WHERE a.id = ?1")
    public int updateApprovalApplication(Long applicationId);

    @Query("select a from Application a where a.user_info.isLocated = ?1 " +
            "and a.end_date = ?2")
    List<Application> findApplicationsFromAnother(Boolean isLocated, LocalDate date);
    @Query("select a from Application a where a.user_info.disability = ?1 " +
            "and a.end_date = ?2")
    List<Application> findApplicationsWithDisability(Disability disability, LocalDate date);
    @Query("select a from Application a where a.user_info.familyCircumstances = ?1 " +
            "and a.end_date = ?2")
    List<Application> findApplicationsWithFamily(FamilyCircumstances familyCircumstances, LocalDate date);
    @Query("select a from Application a where a.user_info.disability = ?1 and a.user_info.familyCircumstances = ?2 " +
            "and a.end_date = ?3")
    List<Application> findApplicationsWithFamilyAndDisability(Disability disability, FamilyCircumstances familyCircumstances, LocalDate date);
    @Query("select a from Application a where a.user_info.disability = ?1 and a.user_info.familyCircumstances = ?2 and a.user_info.isLocated = ?3 " +
            "and a.end_date = ?4")
    List<Application> findApplicationsWithFamilyAndDisabilityAndLocation(Disability disability, FamilyCircumstances familyCircumstances, Boolean isLocated, LocalDate date);
    @Query("select a from Application a where a.user_info.disability = ?1 and a.user_info.isLocated = ?2 " +
            "and a.end_date = ?3")
    List<Application> findApplicationsWithDisabilityAndLocation(Disability disability, Boolean isLocated, LocalDate date);
    @Query("select a from Application a where a.user_info.familyCircumstances = ?1 and a.user_info.isLocated = ?2 " +
            "and a.end_date = ?3")
    List<Application> findApplicationsWithFamilyAndLocation(FamilyCircumstances familyCircumstances, Boolean isLocated, LocalDate date);
}
