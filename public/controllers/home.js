angular.module('MyApp')
    .controller('HomeCtrl', function($scope, $http, toastr) {
        function getBase64Image(img) {

            var canvas = document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            var dataURL = canvas.toDataURL("image/jpeg", 1.0);

            return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        }
        var img = new Image();
        var img2 = new Image();

        img.onload = function() {
            var dataURI = getBase64Image(img);
            return dataURI;

        }
        img2.onload = function() {
            var dataURI = getBase64Image(img2);
            return dataURI;
        }
        $scope.convertDate = function(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat);
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
        }
        $scope.imgToBase64 = function(src, callback) {
                var outputFormat = src.substr(-3) === 'png' ? 'image/png' : 'image/jpeg';
                var img = new Image();
                img.crossOrigin = 'Anonymous';
                img.onload = function() {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    var dataURL;
                    canvas.height = this.naturalHeight;
                    canvas.width = this.naturalWidth;
                    ctx.drawImage(this, 0, 0);
                    dataURL = canvas.toDataURL(outputFormat);
                    callback(dataURL);
                };
                img.src = src;
                if (img.complete || img.complete === undefined) {
                    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    img.src = src;
                }
            }
            //DATOS PARA EL REPORTE NR1
        $scope.datos = [
            { "nro": 1, "fecha": $scope.convertDate(Date.now()), "horaentrada": "8:00", "horasalida": "8:30", "minutos": "30" },
            { "nro": 2, "fecha": $scope.convertDate(Date.now()), "horaentrada": "8:30", "horasalida": "9:30", "minutos": "30" },
            { "nro": 3, "fecha": $scope.convertDate(Date.now()), "horaentrada": "9:30", "horasalida": "10:00", "minutos": "30" },
            { "nro": 4, "fecha": $scope.convertDate(Date.now()), "horaentrada": "10:00", "horasalida": "11:00", "minutos": "60" },
            { "nro": 5, "fecha": $scope.convertDate(Date.now()), "horaentrada": "11:00", "horasalida": "11:30", "minutos": "30" },
            { "nro": 6, "fecha": $scope.convertDate(Date.now()), "horaentrada": "11:30", "horasalida": "12:30", "minutos": "45" },
            { "nro": 7, "fecha": $scope.convertDate(Date.now()), "horaentrada": "12:15", "horasalida": "12:30", "minutos": "30" }
        ]
        $scope.nombres = "JUAN MARINO PRADO";
        $scope.licTramite = "AI";
        $scope.taller = "TALLER CAMBIEMOS DE ACTITUD";
        $scope.expediente = "2289";
        $scope.totalhoras = "270";
        $scope.generarpdf1 = function() {
                var datos = $scope.datos;
                var doc = new jsPDF('l', 'pt');
                var rows = [];
                img.src = '../logoinst.jpg';
                $scope.imgToBase64(img.src, function(imagen) {
                    doc.addImage(imagen, 'JPEG', 80, 10, 180, 60);
                    //doc.setFont("courier", "normal");
                    //doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
                    doc.setFont("helvetica");
                    doc.setFontType("bold");
                    doc.setFontSize(12);
                    doc.text(510, 28, "EXPEDIENTE GENERAL Nº: ");
                    doc.text(680, 28, $scope.expediente)
                    doc.setFontSize(16);
                    doc.text(340, 48, "REGISTRO DE ASISTENCIA A CLASES TEORICAS")
                    doc.setFontSize(12);
                    var colnom = [
                        { title: 'NOMBRES Y APELLIDOS:', dataKey: "nombre" },
                    ]
                    var collic = [
                        { title: 'LICENCIA EN TRAMITE :', dataKey: "lt" }
                    ]
                    var coltipoc = [
                        { title: 'TIPO DE CURSO: ', dataKey: "tc" }
                    ]
                    doc.autoTable(colnom, rows, {
                            margin: { horizontal: 80, top: 70 },
                            columnStyles: {
                                nombre: { columnWidth: 160 }
                            },
                            styles: {
                                fontSize: 12,
                                columnWidth: 'wrap',
                            }
                        })
                        //doc.text(35, 75, "NOMBRES Y APELLIDOS: ");
                    doc.text(245, 85, $scope.nombres);
                    doc.autoTable(collic, rows, {
                            margin: { horizontal: 80, top: 95 },
                            columnStyles: {
                                lt: { columnWidth: 160 }
                            },
                            styles: {
                                fontSize: 12,
                                columnWidth: 'wrap',
                            }
                        })
                        //doc.text(35, 95, "LICENCIA EN TRAMITE: ");
                    doc.text(245, 110, $scope.licTramite);
                    doc.autoTable(coltipoc, rows, {
                            margin: { horizontal: 400, top: 95 },
                            columnStyles: {
                                tc: { columnWidth: 115 }
                            },
                            styles: {
                                fontSize: 12,
                                columnWidth: 'wrap',
                            }
                        })
                        //doc.text(440, 95, "TIPO DE CURSO: ");
                    doc.text(520, 110, $scope.taller);
                    doc.setFontSize(10);
                    //doc.text(35, 44, "");
                    //doc.text(35, 50, "FECHA:" + $scope.convertDate(Date.now()))
                    var col = [
                        { title: 'NRO', dataKey: "nro" },
                        { title: 'FECHA', dataKey: "fecha" },
                        { title: 'HORA DE ENTRADA', dataKey: "horaentrada" },
                        { title: 'HORA DE SALIDA', dataKey: "horasalida" },
                        { title: 'MINUTOS', dataKey: "minutos" }
                    ];

                    console.log(datos[0])
                    console.log(col)
                    for (var key in datos) {
                        var temp = datos[key];
                        rows.push(temp);
                    }
                    console.log(rows)
                    doc.autoTable(col, rows, {
                        tableWidth: 'wrap',
                        margin: { horizontal: 80, top: 130 },
                        styles: {
                            fontSize: 10,
                            columnWidth: 'wrap',
                            halign: 'center'
                        },
                        columnStyles: {
                            nro: { columnWidth: 60, },
                            fecha: { columnWidth: 130 },
                            horaentrada: { columnWidth: 170 },
                            horasalida: { columnWidth: 170 },
                            minutos: { columnWidth: 120 }
                        }
                    });
                    let finalY = doc.autoTable.previous.finalY;
                    doc.text(490, finalY + 10, "TOTAL HORAS: ");
                    doc.text(663, finalY + 10, $scope.totalhoras);
                    doc.text(120, finalY + 90, "__________________________________");
                    doc.text(120, finalY + 101, "    FIRMA DEL ALUMNO(HUELLA)");
                    doc.text(540, finalY + 90, "_____________________");
                    doc.text(540, finalY + 101, " FIRMA DEL DIRECTOR");
                    //window.open(doc.output('bloburl'))
                    doc.save('reporte1.pdf');
                })

            }
            //DATOS PARA EL REPORTE NR2
        $scope.datos2 = [{
            "nro": 1,
            "fecha": $scope.convertDate(Date.now()),
            "tipoexamen": "Conducción responsable I, II y III, Técnicas de manejo defensivo I y II, Psicología aplicada a la conducción y Acoso sexual en espacios públicos.",
            "nota": "16",
            "promedio": "14",
            "resultado": "12"
        }]

        $scope.generarpdf2 = function() {
                var datos = $scope.datos2;
                var doc = new jsPDF('l', 'pt');
                var rows = [];
                img.src = '../logoinst.jpg';
                doc.addImage(img.onload(), 'JPEG', 80, 10, 180, 60);
                //doc.setFont("courier", "normal");
                //doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize(12);
                doc.text(480, 28, "EXPEDIENTE GENERAL Nº: ");
                doc.text(650, 28, $scope.expediente)
                doc.setFontSize(16);
                doc.text(340, 48, "REGISTRO DE ASISTENCIA A EXAMENES TEORICOS")
                doc.setFontSize(12);
                //doc.text(440, 45, "REGISTRO DE ASISTENCIA A CLASES TEORICAS")
                var colnom = [
                    { title: 'NOMBRES Y APELLIDOS:', dataKey: "nombre" },
                ]
                var collic = [
                    { title: 'LICENCIA EN TRAMITE :', dataKey: "lt" }
                ]
                var coltipoc = [
                    { title: 'TIPO DE CURSO: ', dataKey: "tc" }
                ]
                doc.autoTable(colnom, rows, {
                        margin: { horizontal: 80, top: 70 },
                        columnStyles: {
                            nombre: { columnWidth: 160 }
                        },
                        styles: {
                            fontSize: 12,
                            columnWidth: 'wrap',
                        }
                    })
                    //doc.text(35, 75, "NOMBRES Y APELLIDOS: ");
                doc.text(245, 85, $scope.nombres);
                doc.autoTable(collic, rows, {
                        margin: { horizontal: 80, top: 95 },
                        columnStyles: {
                            lt: { columnWidth: 160 }
                        },
                        styles: {
                            fontSize: 12,
                            columnWidth: 'wrap',
                        }
                    })
                    //doc.text(35, 95, "LICENCIA EN TRAMITE: ");
                doc.text(245, 110, $scope.licTramite);
                doc.autoTable(coltipoc, rows, {
                        margin: { horizontal: 400, top: 95 },
                        columnStyles: {
                            tc: { columnWidth: 115 }
                        },
                        styles: {
                            fontSize: 12,
                            columnWidth: 'wrap',
                        }
                    })
                    //doc.text(440, 95, "TIPO DE CURSO: ");
                doc.text(520, 110, $scope.taller);
                doc.setFontSize(10);
                //doc.text(35, 44, "");
                //doc.text(35, 50, "FECHA:" + $scope.convertDate(Date.now()))
                var col = [
                    { title: 'FECHA', dataKey: "fecha" },
                    { title: 'Nª', dataKey: "nro" },
                    { title: 'TIPO DE EXAMEN', dataKey: "tipoexamen" },
                    { title: 'NOTA', dataKey: "nota" },
                    { title: 'PROMEDIO', dataKey: "promedio" },
                    { title: 'RESULTADO', dataKey: "resultado" }
                ];
                var rows = [];
                console.log(datos[0])
                console.log(col)
                for (var key in datos) {
                    var temp = datos[key];
                    rows.push(temp);
                }
                console.log(rows)
                doc.autoTable(col, rows, {
                    tableWidth: 'wrap',
                    margin: { horizontal: 80, top: 130 },
                    styles: {
                        overflow: 'linebreak',
                        columnWidth: 'wrap',
                        fontSize: 10,
                        cellPadding: 4,
                        overflowColumns: 'linebreak'
                    },
                    columnStyles: {
                        fecha: { columnWidth: 70, halign: 'center' },
                        nro: { columnWidth: 30, halign: 'center' },
                        tipoexamen: { columnWidth: 350 },
                        nota: { columnWidth: 80, halign: 'center' },
                        promedio: { columnWidth: 80, halign: 'center' },
                        resultado: { columnWidth: 80, halign: 'center' },

                    },
                    overflowColumns: ['tipoexamen']
                });
                let finalY = doc.autoTable.previous.finalY;
                doc.text(540, finalY + 10, "PROMEDIO FINAL: ");
                doc.text(713, finalY + 10, $scope.totalhoras);
                doc.text(120, finalY + 90, "__________________________________");
                doc.text(120, finalY + 101, "    FIRMA DEL ALUMNO(HUELLA)");
                doc.text(580, finalY + 90, "_____________________");
                doc.text(580, finalY + 101, " FIRMA DEL DIRECTOR");
                //window.open(doc.output('bloburl'))
                doc.save('reporte2.pdf');
            }
            //DATOS PARA EL REPORTE NR3
        $scope.dni = "47985573";
        $scope.fechainicio = $scope.convertDate(Date.now());
        $scope.fechafin = $scope.convertDate(Date.now() + 20);
        $scope.datos3 = [
            { "nro": 1, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Conduccioón responsable I", "minutos": "30" },
            { "nro": 2, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Técnicas de manejo defensivo I", "minutos": "60" },
            { "nro": 3, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Conducción responsable I", "minutos": "30" },
            { "nro": 4, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Psicología aplicada a la conducción", "minutos": "60" },
            { "nro": 5, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Ténicas de manejo defensivo II", "minutos": "30" },
            { "nro": 6, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Conducción responsable III", "minutos": "45" },
            { "nro": 7, "fecha": $scope.convertDate(Date.now()), "nombreCurso": "Acoso sexual en espacios públicos", "minutos": "15" }
        ]

        $scope.generarpdf3 = function() {
                var rows = [];
                var datos = $scope.datos3;
                var doc = new jsPDF('p', 'pt');
                img.src = '../logoinst.jpg';
                img2.src = '../mtc.png';
                doc.addImage(img2.onload(), 'JPEG', 35, 10, 200, 40);
                doc.addImage(img.onload(), 'JPEG', 360, 10, 200, 40);
                //doc.setFont("courier", "normal");
                //doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
                doc.setFont("helvetica");
                doc.setFontType("bold");
                doc.setFontSize(10);
                doc.text(240, 65, "Nº EXPEDIENTE: ");
                doc.text(323, 65, $scope.expediente);
                doc.setFontSize(16);
                doc.text(120, 80, "FICHA INDIVIDUAL DEL ALUMNO CAPACITADO")
                doc.setFontSize(10);
                doc.setFillColor(41, 128, 186);
                //doc.setTextColor(255, 0, 0);
                //doc.text(35, 400, "NOMBRES Y APELLIDOS: ");

                var colnom = [
                    { title: 'NOMBRES Y APELLIDOS ', dataKey: "nombre" }
                ]
                var coldoc = [
                    { title: 'DNI/CE No.                          ', datakey: "dni" }
                ]
                var colfechai = [
                    { title: 'FECHA DE INICIO ', dataKey: "fechainicio" }
                ]
                var colfechaf = [
                    { title: 'FECHA DE TERMINO', dataKey: "fechafin" }
                ]
                var colCT = [
                    { title: 'CLASE Y CATEGORIA DE LICENCIA QUE POSEE', dataKey: "cp" }
                ]
                var colCP = [
                    { title: 'CLASE Y CATEGORIA DE LICENCIA A LA POSTULA', dataKey: "cp" }
                ]

                var colPE = [
                    { title: 'PRECISAR: OBTENCIÓN, REVALIDACIÓN, RECATEGORIZACIÓN', dataKey: "cp" }
                ]

                //encabezado para los nombres y apellidos
                doc.autoTable(colnom, rows, {
                    margin: { horizontal: 35, top: 95 },
                    columnStyles: {
                        nombre: { columnWidth: 135 }
                    },
                    styles: {
                        fontSize: 10,
                        columnWidth: 'wrap'
                    }
                })
                doc.text(180, 110, $scope.nombres);
                //encbezado para documento
                doc.autoTable(coldoc, rows, {
                    margin: { horizontal: 35, top: 118 },
                    columnStyles: {
                        dni: { columnWidth: 135 }
                    },
                    styles: {
                        fontSize: 10,
                        columnWidth: 'wrap'
                    }
                })
                doc.text(180, 133, $scope.dni);
                //encabezado de fecha de inicio 
                doc.autoTable(colfechai, rows, {
                    margin: { horizontal: 35, top: 141 },
                    columnStyles: {
                        fechainicio: { columnWidth: 135 }
                    },
                    styles: {
                        fontSize: 10,
                        columnWidth: 'wrap'
                    }
                })
                doc.text(180, 156, $scope.fechainicio);
                //encabezado de fecha fin 
                doc.autoTable(colfechaf, rows, {
                    margin: { horizontal: 35, top: 164 },
                    columnStyles: {
                        fechafin: { columnWidth: 135 }
                    },
                    styles: {
                        fontSize: 10,
                        columnWidth: 'wrap'
                    }
                })
                doc.text(180, 179, $scope.fechafin);
                //#endregion
                //ENCABEZADO DEL SEGUNDO SECTOR 
                doc.autoTable(colCT, rows, {
                    margin: { horizontal: 250, top: 118 },
                    columnStyles: {
                        cp: { columnWidth: 160 }
                    },
                    styles: {
                        fontSize: 6,
                        columnWidth: 'wrap',
                        overflowColumns: 'linebreak'
                    }
                })
                doc.text(420, 130, $scope.licTramite);
                doc.autoTable(colCP, rows, {
                    margin: { horizontal: 250, top: 141 },
                    columnStyles: {
                        cp: { columnWidth: 160 }
                    },
                    styles: {
                        fontSize: 6,
                        columnWidth: 'wrap',
                        overflowColumns: 'linebreak'
                    }
                })
                doc.text(420, 153, $scope.licTramite);
                doc.autoTable(colPE, rows, {
                    margin: { horizontal: 250, top: 164 },
                    columnStyles: {
                        cp: { columnWidth: 160 }
                    },
                    styles: {
                        fontSize: 6,
                        columnWidth: 'wrap',
                        overflowColumns: 'linebreak'
                    }
                })
                doc.text(420, 176, $scope.licTramite);
                //#endregion
                doc.setFontSize(14);
                doc.text(120, 210, "RESUMEN DE LAS CLASES TEÓRICAS");
                //doc.text(35, 95, "LICENCIA EN TRAMITE: ");
                //doc.text(245, 110, $scope.licTramite);

                //doc.text(35, 65, "NOMBRES Y APELLIDOS: ");
                //doc.text(200, 65, $scope.nombres);
                //doc.text(35, 75, "LICENCIA EN TRAMITE: ");
                //doc.text(200, 75, $scope.licTramite);
                //doc.text(270, 75, "TIPO DE CURSO: ");
                //doc.text(360, 75, $scope.taller);
                doc.setFontSize(10);
                //doc.text(35, 44, "");
                //doc.text(35, 50, "FECHA:" + $scope.convertDate(Date.now()))
                var col = [
                    { title: 'No', dataKey: "nro" },
                    { title: 'NOMBRE DEL CURSO', dataKey: "nombreCurso" },
                    { title: 'MINUTOS', dataKey: "minutos" },
                    { title: 'FECHA CAPACITACION', dataKey: "fecha" }
                ];

                console.log(datos[0])
                console.log(col)
                for (var key in datos) {
                    var temp = datos[key];
                    rows.push(temp);
                }
                console.log(rows)
                doc.autoTable(col, rows, {
                    tableWidth: 'wrap',
                    margin: { horizontal: 35, top: 230 },
                    styles: {
                        fontSize: 10,
                        columnWidth: 'wrap',
                        halign: 'center'
                    },
                    columnStyles: {
                        nro: { columnWidth: 30 },
                        nombreCurso: { columnWidth: 280 },
                        minutos: { columnWidth: 60 },
                        fecha: { columnWidth: 125 }
                    }
                });
                let finalY = doc.autoTable.previous.finalY;
                doc.text(140, finalY + 10, "TOTAL DE HORAS IMPARTIDAS: ");
                doc.text(368, finalY + 10, $scope.totalhoras);
                doc.text(35, finalY + 90, "__________________________________");
                doc.text(35, finalY + 101, "    FIRMA DEL ALUMNO(HUELLA)");
                doc.text(420, finalY + 90, "_____________________");
                doc.text(420, finalY + 101, " FIRMA DEL DIRECTOR");
                doc.save('reporte3.pdf');
            }
            //DATOS PARA LA TABLA 4
        $scope.rgeneral = "123-academi"
        $scope.datosNombres = [
            { AP: "lopez", AM: "magregor", NM: "mario" }
        ]
        $scope.sexo = "M";
        $scope.fechaN = $scope.convertDate(Date.now());
        $scope.generarpdf4 = function() {
            var rows = [];
            var rowsNomb = [];
            var datos = $scope.datos2;
            var doc = new jsPDF('p', 'pt');
            img.src = '../logo.png';
            doc.addImage(img.onload(), 'JPEG', 15, 10, 150, 40);
            //doc.setFont("courier", "normal");
            //doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
            doc.setFont("helvetica");
            doc.setFontType("bold");
            doc.setFontSize(16);
            doc.text(220, 28, "OFICINA DE ADMISION");
            doc.setFontSize(10);
            doc.text(220, 45, "FICHA DE INSCRIPCION")
                /*doc.text(35, 65, "NOMBRES Y APELLIDOS: ");
                doc.text(200, 65, $scope.nombres);
                doc.text(35, 75, "LICENCIA EN TRAMITE: ");
                doc.text(200, 75, $scope.licTramite);
                doc.text(270, 75, "TIPO DE CURSO: ");
                doc.text(360, 75, $scope.taller);*/
            doc.setFontSize(10);

            var colnom = [
                { title: 'REGISTRO GENERAL ', dataKey: "nombre" }
            ]
            var colDatosPersonales = [
                { title: '1.- DATOS DEL ALUMNO (INFORMACION QUE REGISTRA ADMISION)', dataKey: "DPersonales" }
            ]
            var colNombres = [
                { title: 'APELLIDO PATERNO', dataKey: "AP" },
                { title: 'APELLIDO MATERNO', dataKey: "AM" },
                { title: 'NOMBRES', dataKey: "NM" }
            ]
            var colsex = [
                { title: 'SEXO ', dataKey: "sx" }
            ]
            var colM = [
                { title: 'M', dataKey: "sx" }
            ]
            var colF = [
                { title: 'F', dataKey: "sx" }
            ]
            var colfechaN = [
                { title: 'F. NACIMIENTO', dataKey: "fechaN" }
            ]
            var colLNacimiento = [
                { title: 'LUGAR DE NACIMIENTO', dataKey: "cp" }
            ]
            var colDNI = [
                { title: 'DNI', dataKey: "cp" }
            ]

            var colLugarDNI = [
                { title: 'LUGAR DEL DNI', dataKey: "cp" }
            ]
            var colLugarDEP = [
                { title: 'DEPARTAMENTO', dataKey: "cp" }
            ]

            //encabezado para los nombres y apellidos
            doc.autoTable(colnom, rows, {
                margin: { horizontal: 15, top: 95 },
                columnStyles: {
                    nombre: { columnWidth: 130 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            let finalY = doc.autoTable.previous.finalY;
            doc.text(160, finalY - 8, $scope.rgeneral);
            doc.autoTable(colDatosPersonales, rows, {
                margin: { horizontal: 15, top: finalY + 5 },
                columnStyles: {
                    DPersonales: { columnWidth: 450 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })

            for (var key in $scope.datosNombres) {
                var temp = $scope.datosNombres[key];
                rowsNomb.push(temp);
            }
            doc.autoTable(colNombres, rowsNomb, {
                margin: { horizontal: 15, top: finalY + 28 },
                columnStyles: {
                    AP: { columnWidth: 150 },
                    AM: { columnWidth: 150 },
                    NM: { columnWidth: 150 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'

                }
            })
            let finalY1 = doc.autoTable.previous.finalY;
            //doc.text(180, 156, $scope.fechainicio);
            //encabezado de fecha fin 
            doc.autoTable(colsex, rows, {
                margin: { horizontal: 15, top: finalY1 },
                columnStyles: {
                    sx: { columnWidth: 41 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'

                }
            })
            doc.autoTable(colM, rows, {
                margin: { horizontal: 57, top: finalY1 },
                columnStyles: {
                    sx: { columnWidth: 20 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    halign: "center"
                }
            })
            doc.autoTable(colF, rows, {
                margin: { horizontal: 92, top: finalY1 },
                columnStyles: {
                    sx: { columnWidth: 20 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    halign: "center"
                }
            })
            if ($scope.sexo == "M") {
                doc.text(80, finalY1 + 15, "X");
            } else if ($scope.sexo != "M") {
                doc.text(115, finalY1 + 15, "X");
            }

            doc.autoTable(colfechaN, rows, {
                margin: { horizontal: 165, top: finalY1 },
                columnStyles: {
                    fechaN: { columnWidth: 90 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(257, finalY1 + 15, $scope.fechaN);

            //doc.text(420, 130, $scope.licTramite);
            doc.autoTable(colLNacimiento, rows, {
                margin: { horizontal: 315, top: finalY1 },
                columnStyles: {
                    cp: { columnWidth: 150 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            let finalY2 = doc.autoTable.previous.finalY;
            //doc.text(420, 153, $scope.licTramite);
            doc.autoTable(colDNI, rows, {
                margin: { horizontal: 15, top: finalY2 + 1 },
                columnStyles: {
                    cp: { columnWidth: 41 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(80, finalY2 + 15, "48038717");
            doc.autoTable(colLugarDNI, rows, {
                margin: { horizontal: 165, top: finalY2 + 1 },
                columnStyles: {
                    cp: { columnWidth: 90 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(257, finalY2 + 15, "LIMA");
            doc.autoTable(colLugarDEP, rows, {
                margin: { horizontal: 315, top: finalY2 + 1 },
                columnStyles: {
                    cp: { columnWidth: 93 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(409, finalY2 + 15, "LIMA");
            let finalY3 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'EDAD', dataKey: "cp" }], rows, {
                margin: { horizontal: 15, top: finalY3 + 1 },
                columnStyles: {
                    cp: { columnWidth: 41 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(80, finalY3 + 15, "48038717");
            doc.autoTable([{ title: 'DOMICILIO', dataKey: "cp" }], rows, {
                margin: { horizontal: 165, top: finalY3 + 1 },
                columnStyles: {
                    cp: { columnWidth: 149 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(164, finalY3 + 40, "LIMA");
            doc.autoTable([{ title: 'PROVINCIA', dataKey: "cp" }], rows, {
                margin: { horizontal: 315, top: finalY3 + 1 },
                columnStyles: {
                    cp: { columnWidth: 93 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(409, finalY3 + 15, "LIMA");
            let finalY4 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'TELEFONO', dataKey: "cp" }], rows, {
                margin: { horizontal: 15, top: finalY4 + 1 },
                columnStyles: {
                    cp: { columnWidth: 65 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(81, finalY4 + 15, "929527180");
            doc.autoTable([{ title: 'DISTRITO', dataKey: "cp" }], rows, {
                margin: { horizontal: 315, top: finalY4 + 1 },
                columnStyles: {
                    cp: { columnWidth: 93 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                }
            })
            doc.text(409, finalY4 + 15, "LIMA");
            let finalY5 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: '2.- TIPO DE CURSO  (INFORMACION QUE REGISTRA ADMISION)', dataKey: "cp" }], rows, {
                margin: { horizontal: 15, top: finalY5 + 1 },
                columnStyles: {
                    cp: { columnWidth: 450 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })

            //doc.text(420, 176, $scope.licTramite);
            //doc.text(35, 44, "");
            //doc.text(35, 50, "FECHA:" + $scope.convertDate(Date.now()))
            var col = [
                { title: 'FECHA', dataKey: "fecha" },
                { title: 'Nª', dataKey: "nro" },
                { title: 'TIPO DE EXAMEN', dataKey: "tipoexamen" },
                { title: 'NOTA', dataKey: "nota" },
                { title: 'PROMEDIO', dataKey: "promedio" },
                { title: 'RESULTADO', dataKey: "resultado" }
            ];

            console.log(datos[0])
            console.log(col)
            for (var key in datos) {
                var temp = datos[key];
                rows.push(temp);
            }
            console.log(rows)
                /*doc.autoTable(col, rows, {
                    tableWidth: 'wrap',
                    margin: { horizontal: 35, top: 100 },
                    styles: {
                        fontSize: 10,
                        columnWidth: 'wrap'
                    },
                    columnStyles: {
                        fecha: { columnWidth: 70 },
                        nro: { columnWidth: 30 },
                        tipoexamen: { columnWidth: 230 },
                        nota: { columnWidth: 60 },
                        promedio: { columnWidth: 70 },
                        resultado: { columnWidth: 70 }
                    }
                });*/
            doc.save('reporte4.pdf');
        }



        $scope.generarpdfn = function() {
            var datos = $scope.datos2;
            var doc = new jsPDF('p', 'pt');
            img.src = '../logo.png';
            doc.addImage(img.onload(), 'JPEG', 35, 10, 200, 40);
            //doc.setFont("courier", "normal");
            //doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
            doc.setFont("helvetica");
            doc.setFontType("bold");
            doc.setFontSize(10);
            doc.text(280, 28, "EXPEDIENTE GENERAL Nº: ");
            doc.text(420, 28, $scope.expediente)
            doc.setFontSize(10);
            doc.text(240, 45, "REGISTRO DE ASISTENCIA A EXAMENES TEORICOS")
            doc.text(35, 65, "NOMBRES Y APELLIDOS: ");
            doc.text(200, 65, $scope.nombres);
            doc.text(35, 75, "LICENCIA EN TRAMITE: ");
            doc.text(200, 75, $scope.licTramite);
            doc.text(270, 75, "TIPO DE CURSO: ");
            doc.text(360, 75, $scope.taller);
            doc.setFontSize(10);
            //doc.text(35, 44, "");
            //doc.text(35, 50, "FECHA:" + $scope.convertDate(Date.now()))
            var col = [
                { title: 'FECHA', dataKey: "fecha" },
                { title: 'Nª', dataKey: "nro" },
                { title: 'TIPO DE EXAMEN', dataKey: "tipoexamen" },
                { title: 'NOTA', dataKey: "nota" },
                { title: 'PROMEDIO', dataKey: "promedio" },
                { title: 'RESULTADO', dataKey: "resultado" }
            ];
            var rows = [];
            console.log(datos[0])
            console.log(col)
            for (var key in datos) {
                var temp = datos[key];
                rows.push(temp);
            }
            console.log(rows)
            doc.autoTable(col, rows, {
                tableWidth: 'wrap',
                margin: { horizontal: 35, top: 100 },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                },
                columnStyles: {
                    fecha: { columnWidth: 70 },
                    nro: { columnWidth: 30 },
                    tipoexamen: { columnWidth: 230 },
                    nota: { columnWidth: 60 },
                    promedio: { columnWidth: 70 },
                    resultado: { columnWidth: 70 }
                }
            });
            doc.save('reporte2.pdf');
        }

    });