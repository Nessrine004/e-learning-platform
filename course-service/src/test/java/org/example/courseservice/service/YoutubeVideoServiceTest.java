package org.example.courseservice.service;

import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
@ActiveProfiles("test")
class YoutubeVideoServiceTest {

    private MockWebServer server;

    @BeforeEach
    void setUp() throws Exception {
        server = new MockWebServer();
        server.start();
    }

    @AfterEach
    void tearDown() throws Exception {
        server.shutdown();
    }

    @Test
    void searchVideos_shouldReturnMap() {
        server.enqueue(new MockResponse()
                .setResponseCode(200)
                .setBody("{\"items\":[]}")
                .addHeader("Content-Type", "application/json"));

        String baseUrl = server.url("/").toString();
        WebClient client = WebClient.builder().baseUrl(baseUrl).build();

        YoutubeVideoService service = new YoutubeVideoService(client);
        ReflectionTestUtils.setField(service, "apiKey", "fake-key");

        Map<String, Object> result = service.searchVideos("java", 5);

        assertThat(result)
                .isNotNull()
                .containsKey("items");
    }

}
