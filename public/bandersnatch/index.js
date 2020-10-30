const MANIFEST_URL = "manifest.json";
const localHost = ["127.0.0.1", "localhost"];

async function main() {
  const isLocal = !!~localHost.indexOf(window.location.hostname);

  const manifestJSON = (await fetch(MANIFEST_URL)).json();
  const host = isLocal ? manifestJSON.localHost : manifestJSON.productionHost;

  const network = new Network({ host });

  const videoComponent = new VideoComponent();

  const videoPlayer = new VideoMediaPlayer({
    manifestJSON,
    network,
  });

  videoPlayer.initializeCodec();
  videoComponent.initializePlayer();
}

window.onload = main;
