package org.example.courseservice.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class YoutubeVideoService {

    private final WebClient youtubeWebClient;

    @Value("${youtube.api.key}")
    private String apiKey;

    public YoutubeVideoService(WebClient youtubeWebClient) {
        this.youtubeWebClient = youtubeWebClient;
    }

    public Map<String, Object> searchVideos(String query, int maxResults) {
        Mono<Map> responseMono = youtubeWebClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search")
                        .queryParam("part", "snippet")
                        .queryParam("q", query)
                        .queryParam("maxResults", maxResults)
                        .queryParam("type", "video")
                        .queryParam("key", apiKey)
                        .build())
                .retrieve()
                .bodyToMono(Map.class);

        return responseMono.block();
    }
}