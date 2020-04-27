use pm_projects;

-- admin -> admin
-- jagaroc -> ancla

-- columns: [{id: 1,title: 'Backlog',cards: [{ id: 1, title: 'Add card', description: 'Add capability to add a card in a column'},]},{id: 2,title: 'Doing',cards: [{id: 2,title: 'Drag-n-drop support',description: 'Move a card between the columns'},]}]");

TRUNCATE TABLE Proyectos;


-- '{"columns": [{"id": 1,"title": "Backlog","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}'


INSERT INTO Proyectos VALUES (NULL,"Run to Win","Red Social de Running.", '{"columns": [{"id": 1,"title": "Backlog Running","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}'); 
INSERT INTO Proyectos VALUES (NULL,"El Baron de la Birra","Red Social de Cervezas Artesanas",'{"columns": [{"id": 1,"title": "Backlog Cervezas","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');
INSERT INTO Proyectos VALUES (NULL,"Pintorrea","DiccioPinta online",'{"columns": [{"id": 1,"title": "Backlog","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');
INSERT INTO Proyectos VALUES (NULL,"Chess Tournament Generator","Gestor de Emparejamientos Suizos para Ajedrez",'{"columns": [{"id": 1,"title": "Backlog","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');
INSERT INTO Proyectos VALUES (NULL,"EuroStudents ","Gestor Becas Erasmus y Viajes",'{"columns": [{"id": 1,"title": "Backlog","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');
INSERT INTO Proyectos VALUES (NULL,"SportStore","Tienda de deportes",'{"columns": [{"id": 1,"title": "Backlog","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');
INSERT INTO Proyectos VALUES (NULL,"Ambient Music Generator","Creación de Música de Mobiliario",'{"columns": [{"id": 1,"title": "Backlog","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');
INSERT INTO Proyectos VALUES (NULL,"Paiporta Universalis 4","Juego de Gran Estrategia",'{"columns": [{"id": 1,"title": "Backlog PU4","cards": [{"id": 1,"title": "Add card","description": "Add capability to add a card in a column"     }      ]    },    {      "id": 2,      "title": "Doing",      "cards": [        {          "id": 2,          "title": "Drag-n-drop support",          "description": "Move a card between the columns"        }      ]    }  ]}');

TRUNCATE TABLE PerfilesProyecto;
--  ID PERFIL, ID USARIO , ID PROYECTO

-- Jagaroc Run to win
INSERT INTO PerfilesProyecto VALUES (3,9,1);
INSERT INTO PerfilesProyecto VALUES (4,2,1);

-- Carlos Baron de la birra
INSERT INTO PerfilesProyecto VALUES (3,5,2);
INSERT INTO PerfilesProyecto VALUES (4,2,2);

-- Ruben Pintorrea
INSERT INTO PerfilesProyecto VALUES (3,16,3);
INSERT INTO PerfilesProyecto VALUES (4,2,3);

-- Raul - Chess
INSERT INTO PerfilesProyecto VALUES (3,12,4); 
INSERT INTO PerfilesProyecto VALUES (4,2,4);

-- Brian - EuroStudents
INSERT INTO PerfilesProyecto VALUES (3,10,5);
INSERT INTO PerfilesProyecto VALUES (4,2,5);

-- SportStore
INSERT INTO PerfilesProyecto VALUES (3,15,6);
INSERT INTO PerfilesProyecto VALUES (4,3,6);

-- Ambien music generator
INSERT INTO PerfilesProyecto VALUES (3,4,7);
INSERT INTO PerfilesProyecto VALUES (4,2,7);

-- Paiporta Universalis
INSERT INTO PerfilesProyecto VALUES (3,14,8);
INSERT INTO PerfilesProyecto VALUES (4,2,8);

TRUNCATE TABLE TecnologiasProyecto;

INSERT INTO TecnologiasProyecto  VALUES (1,5);
INSERT INTO TecnologiasProyecto  VALUES (1,6);
INSERT INTO TecnologiasProyecto  VALUES (1,1);
INSERT INTO TecnologiasProyecto  VALUES (1,13);

INSERT INTO TecnologiasProyecto  VALUES (2,5);
INSERT INTO TecnologiasProyecto  VALUES (2,7);
INSERT INTO TecnologiasProyecto  VALUES (2,1);
INSERT INTO TecnologiasProyecto  VALUES (2,13);

INSERT INTO TecnologiasProyecto  VALUES (3,3);
INSERT INTO TecnologiasProyecto  VALUES (3,8);
INSERT INTO TecnologiasProyecto  VALUES (3,10);
INSERT INTO TecnologiasProyecto  VALUES (3,13);

INSERT INTO TecnologiasProyecto  VALUES (4,13);
INSERT INTO TecnologiasProyecto  VALUES (5,13);
INSERT INTO TecnologiasProyecto  VALUES (6,13);
INSERT INTO TecnologiasProyecto  VALUES (7,13);

