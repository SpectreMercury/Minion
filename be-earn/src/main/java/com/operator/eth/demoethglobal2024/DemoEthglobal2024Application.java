package com.operator.eth.demoethglobal2024;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.operator.eth.demoethglobal2024")
@MapperScan(value = "com.operator.eth.demoethglobal2024")
public class DemoEthglobal2024Application {

	public static void main(String[] args) {
		SpringApplication.run(DemoEthglobal2024Application.class, args);
	}

}
