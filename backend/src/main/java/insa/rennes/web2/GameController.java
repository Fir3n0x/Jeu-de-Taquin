package insa.rennes.web2;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/game")
public class GameController {

    @Autowired
    private GameService service;

    @GetMapping(path = "grid/{id}")
    public GridDTO getGrid(@PathVariable("id") Long id) {
        Optional<GridDTO> opt = service.getGrid(id);
        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong id Requested");
        }
        return opt.get();
    }

    @GetMapping(path = "grid/names")
    public List<String> getAllNames() {
        Optional<List<String>> opt = service.getAllNames();
        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong");
        }
        return opt.get();
    }

    @PatchMapping(path = "grid/scoreboard", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> patchScoreboard(@RequestBody final ScoreDTO dto) {
        boolean rep = service.patchScoreboard(dto);
        if (rep) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping(path = "grid/{id}/scoreboard")
    public Map<String, Integer> getScoreboard(@PathVariable("id") Long id) {
        Optional<Map<String, Integer>> opt = service.getScoreboard(id);
        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Scoreboard not found");
        }
        return opt.get();
    }
}
