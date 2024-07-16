package ru.isu.restfirst.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.isu.restfirst.model.UserInfo;
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}
