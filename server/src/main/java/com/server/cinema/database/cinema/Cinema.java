package com.server.cinema.database.cinema;

import java.util.Set;

import com.server.cinema.database.show_room.ShowRoom;
import com.server.cinema.database.theatre.Theatre;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Cinema {

    @Id
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(columnDefinition = "DATE", nullable = false)
    private String openingHours;

    @Column(columnDefinition = "DATE", nullable = false)
    private String closingHours;

    @OneToMany(mappedBy = "cinema")
    private Set<ShowRoom> showRooms;

    @OneToOne(mappedBy = "cinema")
    private Theatre theatre;
}
