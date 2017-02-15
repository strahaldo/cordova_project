// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {

        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

     /*   ons.setDefaultDeviceBackButtonListener(function() {
            if (navigator.notification.confirm("Are you sure you want to close the app?",
              function(index) {
                if (index === 1) { // OK button
                  navigator.app.exitApp(); // Close the app
                }
              }
            ));
        });*/
		

// anyscreen(['assets/css/anyscreen.css'],function(){
//     /* do your stuff */
// });


// console.log("Height:", app.deviceHeight);
// console.log("Width:", app.deviceWidth);
// console.log("Container height: ",app.containerHeight);
// console.log("Container width: ",app.containerWidth);



    console.log("ApplicationDirectory", cordova.file.applicationDirectory);
    console.log("ApplicationStorageDirectory", cordova.file.applicationStorageDirectory);
    console.log("DataDirectory", cordova.file.dataDirectory);
    console.log("CacheDirectory", cordova.file.cacheDirectory);
    console.log("ExternalApplicationStorageDirectory", cordova.file.externalApplicationStorageDirectory);
    console.log("ExternalDataDirectory", cordova.file.externalDataDirectory);
    console.log("ExternalCacheDirectory", cordova.file.externalCacheDirectory);
    console.log("ExternalRootDirectory", cordova.file.externalRootDirectory);
    console.log("TempDirectory", cordova.file.tempDirectory);
    console.log("SyncedDataDIrectory", cordova.file.syncedDataDirectory);
    console.log("DocumentsDirectory", cordova.file.documentsDirectory);




        ons.setDefaultDeviceBackButtonListener(function() {
            navigator.app.exitApp(); // Close the app
        });


        //screen.unlockOrientation();

        var hostJsonFolder = ""; //Host of JSON data

       
       var checkTablet = "This device is"+(window.isTablet?'':'NOT')+" a tablet";
       //alert(checkTablet);

       if (checkTablet == "This device is a tablet") {
            screen.unlockOrientation();
            //navigator.splashscreen.hide();
        } else {
            screen.lockOrientation("portrait");
        }
    
        var applaunchCount = window.localStorage.getItem('launchCount');

        //Check if it already existss or not
        if (applaunchCount){
           //This is a second time launch, and count = applaunchCount
           console.log("started before");




           var storageArr = [];
           var serverArr = [];


           function getStorageArr(name, callback) {
            $.get('cdvfile://localhost/persistent/sabamestari/data/' + name, function(data) {
                console.log(data);
                storageArr.push(JSON.parse(data));
                callback();
            });
           };

           function getServerArr(url, callback) {
            $.get('' + url, function(data) { //Get JSON data from Server
                serverArr.push(data);
                callback();
            });
           };

           function compareArrays(arr1, arr2, callback) {
                console.log(arr1[0]);
                console.log(arr2[0]);

                if (arr1[0].sabamestari !== arr2[0].sabamestari) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "sections/sabamestari.php", "data", "sabamestari.json");
                }
                if (arr1[0].pistemestari !== arr2[0].pistemestari) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "sections/pistemestari.php", "data", "pistemestari.json");
                }
                // if (arr1[0].johdanto !== arr2[0].johdanto) {
                //     DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                //     DownloadFile(hostJsonFolder + "sections/johdanto.php", "data", "johdanto.json");
                // }
                if (arr1[0].saba_cards !== arr2[0].saba_cards) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "sabamestari/saba_cards.php", "data", "saba_cards.json");
                }
                if (arr1[0].saba_images !== arr2[0].saba_images) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "sabamestari/saba_images.php", "data", "saba_images.json");
                }
                if (arr1[0].saba_cards_images !== arr2[0].saba_cards_images) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "sabamestari/saba_cards_images.php", "data", "saba_section.json");
                }

                if (arr1[0].piste_cards !== arr2[0].piste_cards) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "pistemestari/piste_cards.php", "data", "piste_cards.json");
                }
                if (arr1[0].piste_images !== arr2[0].piste_images) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "pistemestari/piste_images.php", "data", "piste_images.json");
                }
                if (arr1[0].piste_cards_images !== arr2[0].piste_cards_images) {
                    DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                    DownloadFile(hostJsonFolder + "pistemestari/piste_cards_images.php", "data", "piste_section.json");
                }

                // if (arr1[0].johda_cards !== arr2[0].johda_cards) {
                //     DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                //     DownloadFile(hostJsonFolder + "johdanto/johda_cards.php", "data", "johda_cards.json");
                // }
                // if (arr1[0].johda_images !== arr2[0].johda_images) {
                //     DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                //     DownloadFile(hostJsonFolder + "johdanto/johda_images.php", "data", "johda_images.json");
                // }
                // if (arr1[0].johda_cards_images !== arr2[0].johda_cards_images) {
                //     DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");
                //     DownloadFile(hostJsonFolder + "johdanto/johda_cards_images.php", "data", "johda_section.json");
                // }

                callback();
            };


           getStorageArr('checksum.json', function() {
            getServerArr('checksum.php', function() {
                compareArrays(storageArr, serverArr, function() {
                    navigator.splashscreen.hide();
                });
            });
           });





        } else {
          //Local storage is not set, hence first time launch. set the local storage item
          window.localStorage.setItem('launchCount',1); 

          DownloadFile(hostJsonFolder + "checksum.php", "data", "checksum.json");

          DownloadFile(hostJsonFolder + "sections/sabamestari.php", "data", "sabamestari.json");
          DownloadFile(hostJsonFolder + "sections/pistemestari.php", "data", "pistemestari.json");
          // DownloadFile(hostJsonFolder + "sections/johdanto.php", "data", "johdanto.json");
  
          DownloadFile(hostJsonFolder + "sabamestari/saba_cards_images.php", "data", "saba_section.json");
          DownloadFile(hostJsonFolder + "pistemestari/piste_cards_images.php", "data", "piste_section.json");
          // DownloadFile(hostJsonFolder + "johdanto/johda_cards_images.php", "data", "johda_section.json");
  
          DownloadFile(hostJsonFolder + "sabamestari/saba_images.php", "data", "saba_images.json");
          DownloadFile(hostJsonFolder + "pistemestari/piste_images.php", "data", "piste_images.json");
          // DownloadFile(hostJsonFolder + "johdanto/johda_images.php", "data", "johda_images.json");
  
          DownloadFile(hostJsonFolder + "sabamestari/saba_cards.php", "data", "saba_cards.json");
          DownloadFile(hostJsonFolder + "pistemestari/piste_cards.php", "data", "piste_cards.json");
          // DownloadFile(hostJsonFolder + "johdanto/johda_cards.php", "data", "johda_cards.json");

          setTimeout(function () {
              navigator.splashscreen.hide();
          }, 20000);
        }






        function downloadImages(fileEntry) {
            console.log(fileEntry);
            console.log(fileEntry.fullPath);
            $.get('cdvfile://localhost/persistent' + fileEntry.fullPath, function(data) {
                console.log(JSON.parse(data));
                var imageData = JSON.parse(data);
                $.each(imageData, function(index, value) {
                    //console.log(value.image_name);
                    DownloadFile(value.image_dir, ".images/sabamestari", value.image_name);
                });
            }).done(function() {
                console.log("Array is saved!");
            });
        };

/*
        function downloadSingleImage(fileEntry) {
            $.get('cdvfile://localhost/persistent' + fileEntry.fullPath, function(data) {
                console.log(JSON.parse(data));
                var imageData = JSON.parse(data);
                $.each(imageData, function(index, value) {
                    //console.log(value.image_name);
                    DownloadFile(value.image_dir, ".images/sabamestari", value.image_name);
                });
            }).done(function() {
                console.log("Array is saved!");
            });
        };

        function downloadSinglePisteImage(fileEntry) {
            $.get('cdvfile://localhost/persistent' + fileEntry.fullPath, function(data) {
                console.log(JSON.parse(data));
                var imageData = JSON.parse(data);
                $.each(imageData, function(index, value) {
                    //console.log(value.image_name);
                    DownloadFile(value.image_dir, ".images/pistemestari", value.image_name);
                });
            }).done(function() {
                console.log("Array is saved!");
            });
        };
*/

        function downloadImagesPiste(fileEntry) {
            $.get('cdvfile://localhost/persistent' + fileEntry.fullPath, function(data) {
                console.log(JSON.parse(data));
                var imageData = JSON.parse(data);
                $.each(imageData, function(index, value) {
                    //console.log(value.image_name);
                    DownloadFile(value.image_dir, ".images/pistemestari", value.image_name);
                });
            }).done(function() {
                console.log("Array is saved!");
            });
        };

        // function downloadImagesJohda(fileEntry) {
        //     $.get('cdvfile://localhost/persistent' + fileEntry.fullPath, function(data) {
        //         console.log(JSON.parse(data));
        //         var imageData = JSON.parse(data);
        //         $.each(imageData, function(index, value) {
        //             //console.log(value.image_name);
        //             DownloadFile(value.image_dir, ".images/johdanto", value.image_name);
        //         });
        //     }).done(function() {
        //         console.log("Array is saved!");
        //     });
        // };


        function DownloadFile(URL, Folder_Name, File_Name) {
            //Parameters mismatch check
            if (URL == null && Folder_Name == null && File_Name == null) {
                return;
            }
            else {
              //checking Internet connection availablity
              var networkState = navigator.connection.type;
              if (networkState == Connection.NONE) {
                  return;
              } else {
                  download(URL, Folder_Name, File_Name); //If available download function call
              }
            }
        };

        function download(URL, Folder_Name, File_Name) {
        //step to request a file system 
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
        
            function fileSystemSuccess(fileSystem) {
                var download_link = encodeURI(URL);
                //var ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
            
                var directoryEntry = fileSystem.root; // to get root path of directory
                directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
                var rootdir = fileSystem.root;
                var fp = "cdvfile://localhost/persistent/sabamestari";
            
                fp = fp + "/" + Folder_Name + "/" + File_Name; // fullpath and name of the file which we want to give
                // download function call
                filetransfer(download_link, fp);
            }
            
            function onDirectorySuccess(parent) {
                // Directory created successfuly
                parent.getFile(".nomedia", {create: true, exclusive: true}, gotFile);
                console.log("nomedia created in " + parent);
            }

            function gotFile(fileEntry) {
                //Do something with fileEntry here
            }
            
            function onDirectoryFail(error) {
                //Error while creating directory
                console.log("Unable to create new directory: " + error.code);
                console.log(error);
            }
            
            function fileSystemFail(evt) {
                //Unable to access file system
                console.log(evt.target.error.code);
            }
        };

        function filetransfer(download_link, fp) {
            var fileTransfer = new FileTransfer();
            // File download function with URL and local path
            fileTransfer.download(download_link, fp,
                function (entry) {
                    console.log("download complete: " + entry.fullPath);
                    if (entry.fullPath.slice(18, -12) == "saba") {
                        downloadImages(entry);
                    } /*else if (entry.fullPath.slice(18, -5) == "saba_cards") {
                        downloadSingleImage(entry);
                    } */
                    else if (entry.fullPath.slice(18, -12) == "piste") {
                        downloadImagesPiste(entry);
                    // } else if (entry.fullPath.slice(18, -12) == "johda") {
                    //     downloadImagesJohda(entry);
                    } else if (entry.fullPath.slice(18, -5) == "sabamestari") {
                        downloadImages(entry);
                    } else if (entry.fullPath.slice(18, -5) == "pistemestari") {
                        downloadImagesPiste(entry);
                    } else if (entry.fullPath.slice(18, -5) == "johdanto") {
                        downloadImagesPiste(entry);
                    }
                },
                function (error) {
                //Download abort errors or download failed errors
                console.log("download error source " + error.source);
                //console.log("download error target " + error.target);
                //console.log("upload error code" + error.code);
                }
            );
        };



        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();