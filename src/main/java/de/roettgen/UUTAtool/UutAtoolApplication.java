package de.roettgen.UUTAtool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@Controller
public class UutAtoolApplication {
	@GetMapping("/")
	public String getIndex() {
		return "start";
	}

	public static void main(String[] args) {
		SpringApplication.run(UutAtoolApplication.class, args);
	}
	

}

