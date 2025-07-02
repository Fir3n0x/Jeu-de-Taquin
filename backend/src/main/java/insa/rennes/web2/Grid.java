package insa.rennes.web2;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import lombok.Data;

@Data
@Entity
public class Grid {
    @Id
    @GeneratedValue
    private int id;

    @ElementCollection
    @CollectionTable(name = "grid_board", joinColumns = @JoinColumn(name = "grid_id"))
    @Column(name = "board_value")
    private List<Integer> board;

    @ElementCollection
    @CollectionTable(name = "grid_pattern", joinColumns = @JoinColumn(name = "grid_id"))
    @Column(name = "pattern_value")
    private List<List<Integer>> pattern;

    @ElementCollection
    @CollectionTable(name = "score_map", joinColumns = @JoinColumn(name = "grid_id"))
    @MapKeyColumn(name = "name")
    @Column(name = "score")
    private Map<String, Integer> scoreboard = new HashMap<>();

    public Grid() {    
        
    }

    public Grid(List<Integer> board, List<List<Integer>> pattern) {
        this.board = board;
        this.pattern = pattern;
    }

    public String getName() {
        return "Board " + id;
    }

    public void setScore(String playerName, int score) {

        System.out.println("Avant mise à jour : " + scoreboard);

        // Permet d'enlever le cas où le score d'un joueur ayant déjà joué est remplacé par un nouveau score supérieur du même joueur
        if(!scoreboard.containsKey(playerName) || scoreboard.get(playerName) > score) {
            scoreboard.put(playerName, score);
        }

        System.out.println("Après mise à jour : " + scoreboard);

        scoreboard = scoreboard.entrySet()
            .stream()
            .sorted(Map.Entry.comparingByValue()) // Ordre croissant
            .limit(5) // Limite à 5 meilleurs scores
            .collect(Collectors.toMap(
                    Map.Entry::getKey,
                    Map.Entry::getValue,
                    (e1, e2) -> e1,
                    LinkedHashMap::new // Conserver les valeurs de la nouvelle liste
            ));

            System.out.println("Après tri et limitation : " + scoreboard);
    }

    public int getId() {
        return id;
    }
    
    public List<Integer> getBoard() {
        return board;
    }
    
    public List<List<Integer>> getPattern() {
        return pattern;
    }
    
    public Map<String, Integer> getScoreboard() {
        return scoreboard;
    }
}
