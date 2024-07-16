package ru.isu.restfirst.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.isu.restfirst.model.*;
import ru.isu.restfirst.repository.AdminPanelRepository;
import ru.isu.restfirst.repository.ApplicationRepository;
import ru.isu.restfirst.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminPanelRepository adminPanelRepository;

    public LocalDate getEndDay(){
        return adminPanelRepository.findEndDate();
    }

    public AdminPanel getAdminPanel(){
        return adminPanelRepository.findAllByNowIsTrue();
    }
    public List<Application> getApplicationByUser(Long userId){
        return applicationRepository.findApplicationsByUserId(userId);
    }
    public Integer getApproveCount(){
        return adminPanelRepository.findApplicationCount();
    }

    public List<Application> getAllApplications(LocalDate endDate){
        return applicationRepository.findAllOrderByRank(endDate);
    }
    public List<Application> getAllApprovedApplication(LocalDate endDate){
        return applicationRepository.findApprovedOrderByRank(endDate);
    }

    public List<Application> findApplicationsFromAnother(Boolean isLocated, LocalDate date){
        return applicationRepository.findApplicationsFromAnother(isLocated, date);
    }
    public List<Application> findApplicationsWithDisability(Disability disability, LocalDate date){
        return applicationRepository.findApplicationsWithDisability(disability, date);
    }

    public List<Application> findApplicationsWithFamily(FamilyCircumstances familyCircumstances, LocalDate date){
        return applicationRepository.findApplicationsWithFamily(familyCircumstances, date);
    }

    public List<Application> findApplicationsWithFamilyAndDisability(Disability disability, FamilyCircumstances familyCircumstances, LocalDate date){
        return applicationRepository.findApplicationsWithFamilyAndDisability(disability, familyCircumstances, date);
    }
    public List<Application> findApplicationsWithFamilyAndDisabilityAndLocation(Disability disability,
                                                                                FamilyCircumstances familyCircumstances,
                                                                                Boolean isLocated,
                                                                                LocalDate date){
        return applicationRepository.findApplicationsWithFamilyAndDisabilityAndLocation(disability, familyCircumstances, isLocated, date);
    }

    public List<Application> findApplicationsWithDisabilityAndLocation(Disability disability, Boolean isLocated, LocalDate date){
        return applicationRepository.findApplicationsWithDisabilityAndLocation(disability, isLocated, date);
    }

    public List<Application> findApplicationsWithFamilyAndLocation(FamilyCircumstances familyCircumstances, Boolean isLocated, LocalDate date){
        return applicationRepository.findApplicationsWithFamilyAndLocation(familyCircumstances, isLocated, date);
    }
    public User getUser(Long id){
        return userRepository.searchById(id);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

}
