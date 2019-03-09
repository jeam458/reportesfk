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
                                columnWidth: 'wrap'
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
                var rows3 = [];
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
                doc.setFontSize(8);
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


        $scope.datos5 = [
            { "nro": 1, "param": "Encendido de Vehículo:", op1: " ", op2: " ", op3: "x" },
            { "nro": 2, "param": "Uso de Pedales de Inicio de Conducción:", op1: "x", op2: " ", op3: " " },
            { "nro": 3, "param": "Conducción en Ruta Determinada y Control de Velocidad:", op1: "x", op2: " ", op3: " " },
            { "nro": 4, "param": "Cambios de Velocidad 1ra, 2da, 3ra, 4ta, 5ta:", op1: "x", op2: " ", op3: " " },
            { "nro": 5, "param": "Marcha atrás y Maniobras: ", op1: "x", op2: " ", op3: " " },
            { "nro": 6, "param": "Respeta las Señales de Transito, Semáforos, Señales en la Vía", op1: "x", op2: " ", op3: " " },
            { "nro": 7, "param": "Uso de Dirección: ", op1: "x", op2: " ", op3: " " },
            { "nro": 8, "param": "Viraje a la Derecha, Izquierda, en U con Precaución:", op1: "x", op2: " ", op3: " " },
            { "nro": 9, "param": "Estacionamiento con Señalización: ", op1: "x", op2: " ", op3: " " },
            { "nro": 10, "param": "Estacionamiento en Paralelo:", op1: "x", op2: " ", op3: " " },
            { "nro": 11, "param": "Estacionamiento en Diagonal", op1: "x", op2: " ", op3: " " },
            { "nro": 12, "param": "Mantiene su Derecha:", op1: "x", op2: " ", op3: " " },
            { "nro": 13, "param": "Cruce de Vías y Adelantamiento:", op1: "x", op2: " ", op3: " " },
            { "nro": 14, "param": "Salida y baja de Pendientes:", op1: "x", op2: " ", op3: " " },
            { "nro": 15, "param": "Utilización Adecuada de Bocina:", op1: "x", op2: " ", op3: " " },
            { "nro": 16, "param": "Señales de Brazo:", op1: "x", op2: " ", op3: " " },
            { "nro": 17, "param": "Distancia Segura de Seguimiento:", op1: "x", op2: " ", op3: " " },
            { "nro": 18, "param": "Derecho de Paso", op1: "x", op2: " ", op3: " " },
            { "nro": 19, "param": "Actitud de Manejo:", op1: "x", op2: " ", op3: " " },
            { "nro": 20, "param": "Observación en Ángulos Muertos:", op1: "x", op2: " ", op3: " " },
        ]

        $scope.datos6 = [
            { evaluacion: "A:MB", tipoexamen: "HABILIDAD PARA CONDUCIR", resultado: "" },
            { evaluacion: "B:B", tipoexamen: "HABILIDAD PARA ESTACIONAR", resultado: "" },
            { evaluacion: "C:R", tipoexamen: "APLICACION DE REGLAMENTO", resultado: "" }
        ];


        $scope.generarpdf5 = function() {
            var rows = [];
            var rows1 = [];
            var rows3 = [];
            var datos = $scope.datos5;
            var datos1 = [];
            var datos2 = $scope.datos6;
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
            doc.text(220, 65, "FICHA TECNICA DEL ALUMNO");
            doc.setFontSize(16);
            doc.text(140, 80, "EVALUACION DE PRACTICA DE MANEJO")
            doc.setFontSize(10);
            doc.setFillColor(41, 128, 186);
            //doc.setTextColor(255, 0, 0);
            //doc.text(35, 400, "NOMBRES Y APELLIDOS: ");

            var colnom = [
                { title: 'NOMBRES Y APELLIDOS ', dataKey: "nombre" }
            ]
            var coldoc = [
                { title: 'INSTRUCTOR', dataKey: "inst" }
            ]
            var colfechai = [
                { title: 'FECHA', dataKey: "fechainicio" }
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
                    inst: { columnWidth: 135 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(180, 133, $scope.nombres);
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

            let finalY0 = doc.autoTable.previous.finalY;

            doc.autoTable([{ title: 'A. CLASE VEHICULO', dataKey: "clase" }], rows, {
                margin: { horizontal: 35, top: finalY0 + 1 },
                columnStyles: {
                    clase: { columnWidth: 135 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(180, finalY0 + 18, "toyota yaris");
            doc.autoTable([{ title: 'PLACA', dataKey: "clase" }], rows, {
                margin: { horizontal: 330, top: finalY0 + 1 },
                columnStyles: {
                    clase: { columnWidth: 135 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(476, finalY0 + 18, "X31-234");
            let finalY01 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'B. HORA DE COMIENZO', dataKey: "clase" }], rows, {
                margin: { horizontal: 35, top: finalY01 + 1 },
                columnStyles: {
                    clase: { columnWidth: 135 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(180, finalY01 + 18, "3:00");
            doc.autoTable([{ title: 'HORA DE TERMINO', dataKey: "clase" }], rows, {
                margin: { horizontal: 330, top: finalY01 + 1 },
                columnStyles: {
                    clase: { columnWidth: 135 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(476, finalY01 + 18, "5:00");
            let finalY02 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'C. VIA DE CIRCULACION', dataKey: "clase" }], rows, {
                margin: { horizontal: 35, top: finalY02 + 1 },
                columnStyles: {
                    clase: { columnWidth: 140 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.setFontSize(8);
            doc.text(190, finalY02 + 18, "Av. Sepulveda s/n Helipuerto Salaverry, Cuartel salaverry. Miraflores Arequipa");
            let finalY03 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'D. KILOMETRAJE DE COMIENZO', dataKey: "clase" }], rows, {
                margin: { horizontal: 35, top: finalY03 + 1 },
                columnStyles: {
                    clase: { columnWidth: 170 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(210, finalY03 + 18, "0 KM");
            doc.autoTable([{ title: 'KILOMETRAJE DE TERMINO', dataKey: "clase" }], rows, {
                margin: { horizontal: 330, top: finalY03 + 1 },
                columnStyles: {
                    clase: { columnWidth: 150 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap'
                }
            })
            doc.text(485, finalY03 + 18, "15 KM");
            let finalY04 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'PARAMETROS DE EVALUACION', dataKey: "clase" }], rows, {
                margin: { horizontal: 35, top: finalY04 + 1 },
                columnStyles: {
                    clase: { columnWidth: 340 }
                },
                styles: {
                    fontSize: 10,
                    columnWidth: 'wrap',
                    halign: "center"
                }
            })
            doc.autoTable([{ title: 'PUNTAJE', dataKey: "clase" }], rows, {
                margin: { horizontal: 376, top: finalY04 + 1 },
                columnStyles: {
                    clase: { columnWidth: 180 }
                },
                styles: {
                    fontSize: 10,
                    halign: "center"
                }
            })

            let finalY05 = doc.autoTable.previous.finalY;
            doc.setFontSize(10);
            //doc.text(35, 44, "");
            //doc.text(35, 50, "FECHA:" + $scope.convertDate(Date.now()))
            var col = [
                { title: 'No', dataKey: "nro" },
                { title: 'PARAMETRO', dataKey: "param" },
                { title: 'a)', dataKey: "op1" },
                { title: 'b)', dataKey: "op2" },
                { title: 'c)', dataKey: "op3" }
            ];

            for (var key in datos) {
                var temp = datos[key];
                rows.push(temp);
            }
            doc.autoTable(col, rows, {
                tableWidth: 'wrap',
                margin: { horizontal: 35, top: finalY05 },
                styles: {
                    fontSize: 6,
                    columnWidth: 'wrap'
                },
                columnStyles: {
                    nro: { columnWidth: 31 },
                    param: { columnWidth: 310 },
                    op1: { columnWidth: 60 },
                    op2: { columnWidth: 60 },
                    op3: { columnWidth: 60 }
                }
            });
            let finalY06 = doc.autoTable.previous.finalY;
            for (var key in datos1) {
                var temp = datos1[key];
                rows1.push(temp);
            }
            doc.autoTable([{ title: 'NOTA: OBSERVACION DEL ALUMNO CON RELACION', dataKey: "clase" }], rows1, {
                margin: { horizontal: 40, top: finalY06 + 2 },
                columnStyles: {
                    clase: { columnWidth: 220 }
                },
                styles: {
                    fontSize: 8,
                    columnWidth: 'wrap',
                    halign: "center"

                }
            })
            doc.autoTable([{ title: 'AL APRENDIZAJE', dataKey: "clase" }], rows1, {
                margin: { horizontal: 40, top: finalY06 + 21 },
                columnStyles: {
                    clase: { columnWidth: 220 }
                },
                styles: {
                    fontSize: 8,
                    columnWidth: 'wrap',
                    halign: "center"

                }
            })
            let finalY07 = doc.autoTable.previous.finalY;
            doc.autoTable([{ title: 'OBSERVACION', dataKey: "clase" }], rows1, {
                margin: { horizontal: 40, top: finalY07 },
                columnStyles: {
                    clase: { columnWidth: 110 }
                },
                styles: {
                    fontSize: 8,
                    columnWidth: 'wrap',
                    halign: "center"

                }
            })
            doc.autoTable([{ title: 'SI', dataKey: "clase" }], rows1, {
                margin: { horizontal: 150, top: finalY07 },
                columnStyles: {
                    clase: { columnWidth: 30 }
                },
                styles: {
                    fontSize: 8,
                    columnWidth: 'wrap',
                    halign: "center"

                }
            })
            doc.autoTable([{ title: 'NO', dataKey: "clase" }], rows1, {
                margin: { horizontal: 200, top: finalY07 },
                columnStyles: {
                    clase: { columnWidth: 30 }
                },
                styles: {
                    fontSize: 8,
                    columnWidth: 'wrap',
                    halign: "center"

                }
            })

            var col1 = [
                { title: 'EVALUACION', dataKey: "evaluacion" },
                { title: 'TIPO EXAMEN', dataKey: "tipoexamen" },
                { title: 'RESULTADO', dataKey: "resultado" }
            ];
            for (var key in datos2) {
                var temp = datos2[key];
                rows3.push(temp);
            }
            doc.autoTable(col1, rows3, {
                tableWidth: 'wrap',
                margin: { horizontal: 300, top: finalY06 + 2 },
                styles: {
                    fontSize: 6,
                    columnWidth: 'wrap',
                    overflowColumns: 'linebreak'
                },
                columnStyles: {
                    evaluacion: { columnWidth: 80 },
                    tipoexamen: { columnWidth: 100 },
                    resultado: { columnWidth: 70 }
                }
            });

            let finalY = doc.autoTable.previous.finalY;
            //doc.text(140, finalY + 10, "TOTAL DE HORAS IMPARTIDAS: ");
            //doc.text(368, finalY + 10, $scope.totalhoras);
            doc.text(35, finalY + 90, "__________________________________");
            doc.text(35, finalY + 101, "    FIRMA DEL ALUMNO(HUELLA)");
            doc.text(45, finalY + 112, "       DNI:..............")
            doc.text(420, finalY + 90, "_____________________");
            doc.text(420, finalY + 101, " FIRMA DEL DIRECTOR");
            doc.save('reporte3.pdf');
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