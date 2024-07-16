package ru.isu.restfirst.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

@Component("corsFilter")
public class CORSFilter implements Filter
{
    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException
    {
        System.out.println("->>>>>>");
        HttpServletResponse response = (HttpServletResponse) resp;

                // Добавляем заголовки для CORS
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
//        response.setHeader("Access-Control-Allow-Origin", "localhost:4200");
//        response.setHeader("Access-Control-Allow-Credentials", "true");
////        response.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
//        response.setHeader("Access-Control-Allow-Headers",
//                "x-access-token, Origin, Content-Type, Accept");
////        response.setHeader("Access-Control-Expose-Headers",
////                "Origin, Access-Control-Request-Method, Access-Control-Allow-Origin, Access-Control-Allow-Credentials");
////        response.setHeader("Access-Control-Max-Age", "4000");
//        response.setHeader("X-Powered-By", "Express");
//        response.setHeader("Vary", "Origin");
//        response.setHeader("Content-Type", "application/json; charset=utf-8");
//        response.setHeader("ETag", "W/\"256-2AbVHH+AXAr9uryzJSP2WE5KEDo\"");
        chain.doFilter(req, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException
    {
    }

    @Override
    public void destroy()
    {
    }
}