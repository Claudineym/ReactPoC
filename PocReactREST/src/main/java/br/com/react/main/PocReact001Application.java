package br.com.react.main;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Stream;

import org.apache.catalina.connector.Connector;
import org.apache.coyote.AbstractProtocol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatConnectorCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import br.com.react.model.Beer;
import br.com.react.repository.BeerRepository;

@SpringBootApplication(scanBasePackages= {"br.com.react.main", "br.com.react.repository", "br.com.react.controller"})
@EnableJpaRepositories("br.com.react.repository")
@EntityScan("br.com.react.model")
public class PocReact001Application implements CommandLineRunner {
	
	@Autowired
	private BeerRepository beerRepository;

	public static void main(String[] args) {
		System.setProperty("server.port","8080");
        System.setProperty("server.tomcat.max-threads","200");
        System.setProperty("server.connection-timeout","60000");
		SpringApplication.run(PocReact001Application.class, args);
	}	
	
	@Override
	public void run(String... arg0) throws Exception {
		// Top beers from https://www.beeradvocate.com/lists/top/
        Stream.of("Kentucky Brunch Brand Stout", "Good Morning", "Very Hazy", "King Julius",
                "Budweiser", "Coors Light", "PBR").forEach(name ->
                beerRepository.save(new Beer(name))
        );
        beerRepository.findAll().forEach(System.out::println);
    }
	
	@Bean
    public FilterRegistrationBean simpleCorsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5000", "http://localhost:3333", "http://localhost"));
        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
	
	@Bean
	public EmbeddedServletContainerFactory servletContainerFactory() {
	    TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory();

	    factory.addConnectorCustomizers(new TomcatConnectorCustomizer() {
	        @Override
	        public void customize(Connector connector) {
	            ((AbstractProtocol<?>) connector.getProtocolHandler()).setConnectionTimeout(10000);
	        }
	    });
	    return factory;
	}
}
