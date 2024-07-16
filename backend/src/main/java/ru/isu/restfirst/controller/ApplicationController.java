package ru.isu.restfirst.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.isu.restfirst.model.*;
import ru.isu.restfirst.repository.AdminPanelRepository;
import ru.isu.restfirst.repository.ApplicationRepository;
import ru.isu.restfirst.repository.UserInfoRepository;
import ru.isu.restfirst.service.ApplicationService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private AdminPanelRepository adminPanelRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    //страница для ранжирования заявок
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getAllApplications(){
        //все заявления
        LocalDate date = applicationService.getEndDay();
        List<Application> applications = applicationService.getAllApplications(date);
        System.out.println(applications.size());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/approvedApplications")
    public ResponseEntity<List<Application>> getAllApproved(){
        LocalDate date = applicationService.getEndDay();
        List<Application> applications = applicationService.getAllApprovedApplication(date);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/applicationsLimit")
    public ResponseEntity<Integer> getApproveCount(){
        Integer count = applicationService.getApproveCount();
        return ResponseEntity.ok(count);
    }

    @PostMapping("/rankingApplications")
    public ResponseEntity<?> rankingApplications(@RequestBody ApproveRankRequest ApproveRankRequest) {
        List<Long> id = ApproveRankRequest.getRankingId();
        List<Long> rank = ApproveRankRequest.getRankingRank();

        for(int i = 0; i < ApproveRankRequest.getRankingId().size(); i++){
            System.out.println(applicationRepository.updateRankApplication(rank.get(i), id.get(i)));
        }
        for(var item : ApproveRankRequest.getChecking()){
            System.out.println(applicationRepository.updateApprovalApplication(item));
        }
        return ResponseEntity.ok("fdf");
    }

    @RequestMapping("/newAdminPanel")
    public ResponseEntity<?> newAdmin(@RequestBody NewAdminResponse newAdminResponse){
        AdminPanel ad = adminPanelRepository.findAllByNowIsTrue();
        ad.setNow(false);
        adminPanelRepository.save(ad);
        AdminPanel adminPanel = new AdminPanel(newAdminResponse.getEndDate(),newAdminResponse.getCount(),true);
        adminPanelRepository.save(adminPanel);
        return ResponseEntity.ok(adminPanel);
    }

    @RequestMapping("/applicationSorting")
    public ResponseEntity<?> sortingApplications(@RequestBody SortingRequest sortingRequest){
        LocalDate endDate = applicationService.getEndDay();
        List<Application> applications = null;
        Disability disability = null;
        switch (sortingRequest.getDisability()){
            case "Нет" -> disability = Disability.NONE;
            case "1 группа" -> disability = Disability.FIRST;
            case "2 группа" -> disability = Disability.SECOND;
            case "3 группа" -> disability = Disability.THIRD;
        }
        FamilyCircumstances familyCircumstance = null;
        switch (sortingRequest.getFamily()){
            case "Нет" -> familyCircumstance = FamilyCircumstances.NONE;
            case "Потеря кормильца" -> familyCircumstance = FamilyCircumstances.LOSS;
            case "Сирота" -> familyCircumstance = FamilyCircumstances.ORPHAN;
        }
        if(sortingRequest.getAnother()){
            if(!sortingRequest.getDisability().isBlank() && sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsWithDisabilityAndLocation(disability, sortingRequest.getAnother(), endDate);
            }
            if(sortingRequest.getDisability().isBlank() && !sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsWithFamilyAndLocation(familyCircumstance, sortingRequest.getAnother(), endDate);
            }
            if(!sortingRequest.getDisability().isBlank() && !sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsWithFamilyAndDisabilityAndLocation(disability,familyCircumstance,sortingRequest.getAnother(), endDate);
            }
            if(sortingRequest.getDisability().isBlank() && sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsFromAnother(sortingRequest.getAnother(), endDate);
            }
        }
        else{
            if(!sortingRequest.getDisability().isBlank() && sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsWithDisability(disability, endDate);
            }
            if(sortingRequest.getDisability().isBlank() && !sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsWithFamily(familyCircumstance, endDate);
            }
            if(!sortingRequest.getDisability().isBlank() && !sortingRequest.getFamily().isBlank()){
                applications = applicationService.findApplicationsWithFamilyAndDisability(disability, familyCircumstance, endDate);
            }
            if(sortingRequest.getDisability().isBlank() && sortingRequest.getFamily().isBlank()){
                applications = applicationService.getAllApplications(endDate);
            }
        }

        return ResponseEntity.ok(applications);
    }

    //переходная страница для подачи заявки
    //показывает, когда заканчивается время подачи или что уже заявка подана
    @GetMapping("/date")
    public ResponseEntity<LocalDate> getPreSubmission(){
        LocalDate endDate = applicationService.getEndDay();
        System.out.println(endDate);
        return ResponseEntity.ok(endDate);
    }

    @GetMapping("/now")
    public ResponseEntity<?> getAdminInfo(){
        AdminPanel adminPanel = applicationService.getAdminPanel();
        return ResponseEntity.ok(adminPanel);
    }

    @GetMapping("/application/{userId}")
    public ResponseEntity<?> getUserApplication(@PathVariable Long userId){
        List<Application> applications = applicationService.getApplicationByUser(userId);
        System.out.println(applications.size());
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/disability")
    public ResponseEntity<?> getEnumDisabilities(){
        Disability[] disabilities = Disability.values();
        List<String> responseDisabilities = new ArrayList<>();
        for(var item : disabilities){
            responseDisabilities.add(item.getName());
        }

        return ResponseEntity.ok(responseDisabilities);
    }

    @GetMapping("/familyCircumstance")

    public ResponseEntity<?> getFamilyCircumstance(){
        FamilyCircumstances[] familyCircumstances = FamilyCircumstances.values();
        List<String> responseFamilyCircumstances = new ArrayList<>();
        for(var item : familyCircumstances){
            responseFamilyCircumstances.add(item.getName());
        }

        return ResponseEntity.ok(responseFamilyCircumstances);
    }

    @PostMapping("/createApplication")
    public ResponseEntity<?> createApplication(@Valid @RequestBody ApplicationRequest ApplicationRequest) {
        System.out.println("yatya");
        User user = applicationService.getUser(ApplicationRequest.getUserId());
        System.out.println(ApplicationRequest);
        //создать доп инфу к заявке -> взять id созданной сущности -> закинуть в заявление -> сохранить
        UserInfo userInfo = new UserInfo();

        userInfo.setCountry(ApplicationRequest.getCountry());
        userInfo.setCity(ApplicationRequest.getCity());
        userInfo.setAddress(ApplicationRequest.getAddress());
        userInfo.setBirthDate(ApplicationRequest.getBirthDate());
        userInfo.setAnotherInformation(ApplicationRequest.getAnotherInformation());

        switch (ApplicationRequest.getDisability()){
            case "Нет" -> userInfo.setDisability(Disability.NONE);
            case "1 группа" -> userInfo.setDisability(Disability.FIRST);
            case "2 группа" -> userInfo.setDisability(Disability.SECOND);
            case "3 группа" -> userInfo.setDisability(Disability.THIRD);
        }

        switch (ApplicationRequest.getFamilyCircumstance()){
            case "Нет" -> userInfo.setFamilyCircumstances(FamilyCircumstances.NONE);
            case "Потеря кормильца" -> userInfo.setFamilyCircumstances(FamilyCircumstances.LOSS);
            case "Сирота" -> userInfo.setFamilyCircumstances(FamilyCircumstances.ORPHAN);
        }
        Long count = 0L;
        if(!ApplicationRequest.getCountry().equalsIgnoreCase("Россия") ||
                !ApplicationRequest.getCity().equalsIgnoreCase("Иркутск")){
            userInfo.setIsLocated(true);
            count = 1000000L;
        }
        else{
            userInfo.setIsLocated(false);
        }

        userInfoRepository.save(userInfo);
        LocalDate endDate = applicationService.getEndDay();
        Application application = new Application(
                user,
                userInfo,
                LocalDate.now(),
                endDate,
                false,
                1L
        );

        applicationRepository.save(application);
        application.setRank(application.getId() +
                userInfo.getDisability().getValue() + userInfo.getFamilyCircumstances().getValue()
        + count);
        System.out.println(application.getRank());
        applicationRepository.save(application);
        return new ResponseEntity<>("Application created Successfully!", HttpStatus.OK);
    }
}
