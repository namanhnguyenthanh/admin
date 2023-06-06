const firebaseConfig = {
  apiKey: "AIzaSyDI_AjTLpg0j7vbkVsMklhlxKd-Q_EgcPY",
  authDomain: "dlc-qlbh-projectmd1webapp.firebaseapp.com",
  projectId: "dlc-qlbh-projectmd1webapp",
  storageBucket: "dlc-qlbh-projectmd1webapp.appspot.com",
  messagingSenderId: "398934511850",
  appId: "1:398934511850:web:a986420514d44861b64793",
  measurementId: "G-4DCW3N6Y0N",
};
firebase.initializeApp(firebaseConfig);
var image = [];
// firebase bucket name
// REPLACE WITH THE ONE YOU CREATE
// ALSO CHECK STORAGE RULES IN FIREBASE CONSOLE
var fbBucketName = "images";

// get elements
var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");

// listen for file selection
fileButton.addEventListener("change", function (e) {
  //Get files
  for (var i = 0; i < e.target.files.length; i++) {
    var imageFile = e.target.files[i];

    uploadImageAsPromise(imageFile);
  }
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise(imageFile) {
  return new Promise(function (resolve, reject) {
    var storageRef = firebase
      .storage()
      .ref(fbBucketName + "/" + imageFile.name);

    //Upload file
    var task = storageRef.put(imageFile);

    //Update progress bar
    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },
      function error(err) {},
      function complete() {
        var downloadURL = task.snapshot.downloadURL;
        console.log("dowload URL --->", downloadURL);
        image.push(downloadURL);
        let divLocation = document.getElementById("listImg");
        let imgElement = document.createElement("img");
        imgElement.src = downloadURL;
        divLocation.append(imgElement);
      }
    );
  });
}
function getImage() {
  return image;
}
