import { Component, OnInit } from '@angular/core';
import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders'; // This is important for GLB file support
import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  SceneLoader,
  Vector3,
  MeshBuilder,
} from '@babylonjs/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
})
export class AvatarComponent {
  private canvas!: HTMLCanvasElement;
  private engine!: Engine;
  private scene!: Scene;

  constructor() {}

  ngAfterViewInit() {
    this.createScene();
    this.loadGLBModel();
  }

  createScene() {
    this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

    // Optionally set canvas size dynamically
    this.canvas.width = 900;
    this.canvas.height = 900;

    this.engine = new BABYLON.Engine(this.canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      alpha: true,
    });
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0); // Transparent background

    // Create the camera
    const camera = new BABYLON.ArcRotateCamera(
      'Camera',
      Math.PI, // Horizontal angle (alpha)
      Math.PI / 4, // Vertical angle (beta)
      3, // Distance from the target
      new BABYLON.Vector3(0, 0, 0), // Target position
      this.scene
    );
    camera.attachControl(this.canvas, true); // Attach the camera to the canvas

    // Create a light source
    const light = new BABYLON.HemisphericLight(
      'light1',
      new BABYLON.Vector3(1, 1, 0),
      this.scene
    );
    light.intensity = 1; // Adjust light intensity if needed

    // Resize the engine when the window is resized
    window.addEventListener('resize', () => {
      this.engine.resize();
    });

    // Optionally, start the render loop here
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    // Function to rotate camera manually
    function rotateCamera(deltaAlpha: number, deltaBeta: number) {
      camera.alpha += deltaAlpha;
      camera.beta += deltaBeta;
    }

    // Example usage: rotate camera by a small increment
    rotateCamera(0.01, 0); // Rotate horizontally
    rotateCamera(0, 0.01); // Rotate vertically
  }

  loadGLBModel() {
    SceneLoader.ImportMesh(
      '',
      'assets/avatar/',
      'avatar-default.glb',
      this.scene,
      (meshes) => {
        this.scene.createDefaultCameraOrLight(true, true, true);
        this.engine.runRenderLoop(() => this.scene.render());
      }
    );
  }
}
