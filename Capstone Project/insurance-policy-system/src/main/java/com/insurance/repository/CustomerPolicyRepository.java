package com.insurance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.entity.Customer;
import com.insurance.entity.CustomerPolicy;
import com.insurance.entity.Policy;

@Repository
public interface CustomerPolicyRepository extends JpaRepository<CustomerPolicy, Long> {

    List<CustomerPolicy> findByCustomerAndStatus(Customer customer, String status);

    List<CustomerPolicy> findByStatus(String status);

    boolean existsByCustomerAndPolicy(Customer customer, Policy policy);
}
