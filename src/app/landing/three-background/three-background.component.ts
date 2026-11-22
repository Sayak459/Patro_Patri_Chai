import {

  AfterViewInit,

  Component,

  ElementRef,

  NgZone,

  OnDestroy,

  ViewChild

} from '@angular/core';

import * as THREE from 'three';

@Component({

  selector: 'app-three-background',

  templateUrl: './three-background.component.html',

  styleUrls: ['./three-background.component.css']

})

export class ThreeBackgroundComponent implements AfterViewInit, OnDestroy {

  @ViewChild('stage', { static: true })

  private stageRef!: ElementRef<HTMLDivElement>;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private camera!: THREE.OrthographicCamera;

  private boy!: THREE.Group;

  private girl!: THREE.Group;

  private particles: THREE.Mesh[] = [];

  private animationFrameId = 0;

  private resizeObserver?: ResizeObserver;

  private startTime = 0;

  private destroyed = false;

  private readonly clock = new THREE.Clock();

  constructor(private readonly ngZone: NgZone) { }

  ngAfterViewInit(): void {

    this.initializeScene();

  }

  private initializeScene(): void {

    const stage = this.stageRef.nativeElement;

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(

      -8,

      8,

      4.5,

      -4.5,

      0.1,

      100

    );

    this.camera.position.set(0, 0, 20);

    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({

      alpha: true,

      antialias: true

    });

    this.renderer.setPixelRatio(

      Math.min(window.devicePixelRatio || 1, 2)

    );

    this.renderer.setSize(

      stage.clientWidth || window.innerWidth,

      stage.clientHeight || window.innerHeight

    );

    this.renderer.setClearColor(0x000000, 0);

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    this.renderer.toneMappingExposure = 1.2;

    this.renderer.domElement.setAttribute(

      'aria-hidden',

      'true'

    );

    this.renderer.domElement.style.display = 'block';

    this.renderer.domElement.style.width = '100%';

    this.renderer.domElement.style.height = '100%';

    this.renderer.domElement.style.pointerEvents = 'none';

    stage.appendChild(this.renderer.domElement);

    this.addLights();

    this.boy = this.createCharacter('boy');

    this.girl = this.createCharacter('girl');

    this.boy.position.set(-12, -2.5, 1);

    this.girl.position.set(12, -2.5, 1);

    this.scene.add(this.boy);

    this.scene.add(this.girl);

    this.createParticles();

    this.resizeScene();

    this.resizeObserver = new ResizeObserver(() => {

      this.resizeScene();

    });

    this.resizeObserver.observe(stage);

    this.startTime = performance.now();

    this.ngZone.runOutsideAngular(() => {

      this.animate();

    });

  }

  private addLights(): void {

    const ambientLight = new THREE.AmbientLight(

      0xffffff,

      2.2

    );

    this.scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(

      0xff7aa8,

      45,

      30

    );

    pinkLight.position.set(-5, 4, 8);

    this.scene.add(pinkLight);

    const goldLight = new THREE.PointLight(

      0xffd18b,

      35,

      30

    );

    goldLight.position.set(5, 3, 8);

    this.scene.add(goldLight);

    const frontLight = new THREE.DirectionalLight(

      0xffffff,

      1.5

    );

    frontLight.position.set(0, 5, 10);

    this.scene.add(frontLight);

  }

  private material(

    color: THREE.ColorRepresentation,

    roughness = 0.65,

    metalness = 0

  ): THREE.MeshStandardMaterial {

    return new THREE.MeshStandardMaterial({

      color,

      roughness,

      metalness,

      transparent: true,

      opacity: 1

    });

  }

  private addSphere(

    parent: THREE.Object3D,

    radius: number,

    color: THREE.ColorRepresentation,

    position: THREE.Vector3,

    scale?: THREE.Vector3

  ): THREE.Mesh {

    const geometry = new THREE.SphereGeometry(

      radius,

      24,

      18

    );

    const mesh = new THREE.Mesh(

      geometry,

      this.material(color)

    );

    mesh.position.copy(position);

    if (scale) {

      mesh.scale.copy(scale);

    }

    parent.add(mesh);

    return mesh;

  }

  private addCylinder(

    parent: THREE.Object3D,

    radiusTop: number,

    radiusBottom: number,

    height: number,

    color: THREE.ColorRepresentation,

    position: THREE.Vector3

  ): THREE.Mesh {

    const geometry = new THREE.CylinderGeometry(

      radiusTop,

      radiusBottom,

      height,

      20

    );

    const mesh = new THREE.Mesh(

      geometry,

      this.material(color)

    );

    mesh.position.copy(position);

    parent.add(mesh);

    return mesh;

  }

  private addLimb(

    parent: THREE.Object3D,

    start: THREE.Vector3,

    end: THREE.Vector3,

    radius: number,

    color: THREE.ColorRepresentation

  ): THREE.Mesh {

    const direction = new THREE.Vector3().subVectors(

      end,

      start

    );

    const length = direction.length();

    const geometry = new THREE.CylinderGeometry(

      radius * 0.8,

      radius,

      length,

      16

    );

    const limb = new THREE.Mesh(

      geometry,

      this.material(color)

    );

    limb.position.copy(

      start.clone().add(end).multiplyScalar(0.5)

    );

    limb.quaternion.setFromUnitVectors(

      new THREE.Vector3(0, 1, 0),

      direction.normalize()

    );

    parent.add(limb);

    return limb;

  }

  private createCharacter(

    type: 'boy' | 'girl'

  ): THREE.Group {

    const character = new THREE.Group();

    const isBoy = type === 'boy';

    const skinColor = 0xf1bd98;

    const hairColor = isBoy ? 0x29202a : 0x241522;

    const shirtColor = isBoy ? 0xeee1d6 : 0xf3b5c8;

    const lowerColor = isBoy ? 0x34304d : 0x8e294d;

    const shoeColor = 0x241b2a;

    // Body

    this.addSphere(

      character,

      0.34,

      shirtColor,

      new THREE.Vector3(0, 1.42, 0),

      new THREE.Vector3(0.78, 1.4, 0.55)

    );

    // Neck

    this.addCylinder(

      character,

      0.11,

      0.12,

      0.24,

      skinColor,

      new THREE.Vector3(0, 1.85, 0)

    );

    // Head

    this.addSphere(

      character,

      0.42,

      skinColor,

      new THREE.Vector3(0, 2.25, 0),

      new THREE.Vector3(0.9, 1.05, 0.78)

    );

    // Hair cap

    this.addSphere(

      character,

      0.4,

      hairColor,

      new THREE.Vector3(0, 2.48, -0.015),

      new THREE.Vector3(1.04, 0.75, 0.88)

    );

    // Forehead overlay makes the hairline visible.

    const forehead = this.addSphere(

      character,

      0.29,

      skinColor,

      new THREE.Vector3(0, 2.34, 0.2),

      new THREE.Vector3(1.05, 0.7, 0.5)

    );

    forehead.scale.y = 0.56;

    if (isBoy) {

      // Short side hair

      this.addSphere(

        character,

        0.2,

        hairColor,

        new THREE.Vector3(-0.31, 2.28, 0.01),

        new THREE.Vector3(0.65, 0.85, 0.8)

      );

      this.addSphere(

        character,

        0.2,

        hairColor,

        new THREE.Vector3(0.31, 2.28, 0.01),

        new THREE.Vector3(0.65, 0.85, 0.8)

      );

    } else {

      // Long hair behind the head

      this.addSphere(

        character,

        0.37,

        hairColor,

        new THREE.Vector3(0, 2.05, -0.17),

        new THREE.Vector3(1.1, 1.5, 0.6)

      );

      // Keep the face visible in front of the hair.

      this.addSphere(

        character,

        0.4,

        skinColor,

        new THREE.Vector3(0, 2.23, 0.15),

        new THREE.Vector3(0.9, 1.02, 0.76)

      );

      // Front fringe

      this.addSphere(

        character,

        0.22,

        hairColor,

        new THREE.Vector3(-0.15, 2.55, 0.13),

        new THREE.Vector3(1.15, 0.48, 0.55)

      );

      // Long hair strands

      this.addSphere(

        character,

        0.16,

        hairColor,

        new THREE.Vector3(-0.34, 1.9, -0.02),

        new THREE.Vector3(0.65, 1.5, 0.65)

      );

      this.addSphere(

        character,

        0.16,

        hairColor,

        new THREE.Vector3(0.34, 1.9, -0.02),

        new THREE.Vector3(0.65, 1.5, 0.65)

      );

    }

    // Eyes

    for (const eyeX of [-0.15, 0.15]) {

      this.addSphere(

        character,

        0.045,

        0x21151b,

        new THREE.Vector3(eyeX, 2.29, 0.36),

        new THREE.Vector3(0.8, 1.2, 0.5)

      );

      this.addSphere(

        character,

        0.013,

        0xffffff,

        new THREE.Vector3(eyeX - 0.012, 2.31, 0.382)

      );

    }

    // Nose

    this.addSphere(

      character,

      0.055,

      skinColor,

      new THREE.Vector3(0, 2.19, 0.39),

      new THREE.Vector3(0.65, 0.85, 0.6)

    );

    // Smile

    const smilePoints = [

      new THREE.Vector3(-0.11, 2.11, 0.365),

      new THREE.Vector3(-0.055, 2.075, 0.39),

      new THREE.Vector3(0, 2.07, 0.4),

      new THREE.Vector3(0.055, 2.075, 0.39),

      new THREE.Vector3(0.11, 2.11, 0.365)

    ];

    const smileCurve = new THREE.CatmullRomCurve3(

      smilePoints

    );

    const smileGeometry = new THREE.TubeGeometry(

      smileCurve,

      16,

      0.014,

      8,

      false

    );

    const smile = new THREE.Mesh(

      smileGeometry,

      this.material(0x8b354a)

    );

    character.add(smile);

    // Cheeks

    for (const cheekX of [-0.24, 0.24]) {

      this.addSphere(

        character,

        0.065,

        0xe88e9f,

        new THREE.Vector3(cheekX, 2.14, 0.3),

        new THREE.Vector3(1.3, 0.65, 0.4)

      );

    }

    // Lower body

    if (isBoy) {

      this.addCylinder(

        character,

        0.26,

        0.31,

        0.64,

        lowerColor,

        new THREE.Vector3(0, 0.85, 0)

      );

    } else {

      // A-line dress

      this.addCylinder(

        character,

        0.47,

        0.25,

        0.9,

        lowerColor,

        new THREE.Vector3(0, 0.76, 0)

      );

      // Waist detail

      this.addCylinder(

        character,

        0.25,

        0.25,

        0.08,

        0xd89b55,

        new THREE.Vector3(0, 1.02, 0.01)

      );

    }

    // Legs

    const leftLeg = new THREE.Group();

    leftLeg.position.set(-0.15, 0.45, 0);

    this.addCylinder(

      leftLeg,

      0.09,

      0.1,

      0.52,

      isBoy ? 0x34304d : skinColor,

      new THREE.Vector3(0, -0.22, 0)

    );

    character.add(leftLeg);

    const rightLeg = new THREE.Group();

    rightLeg.position.set(0.15, 0.45, 0);

    this.addCylinder(

      rightLeg,

      0.09,

      0.1,

      0.52,

      isBoy ? 0x34304d : skinColor,

      new THREE.Vector3(0, -0.22, 0)

    );

    character.add(rightLeg);

    // Shoes

    this.addSphere(

      leftLeg,

      0.12,

      shoeColor,

      new THREE.Vector3(-0.015, -0.48, 0.055),

      new THREE.Vector3(1.2, 0.55, 1.6)

    );

    this.addSphere(

      rightLeg,

      0.12,

      shoeColor,

      new THREE.Vector3(0.015, -0.48, 0.055),

      new THREE.Vector3(1.2, 0.55, 1.6)

    );

    // Arms and shoulder pivots

    const leftArm = new THREE.Group();

    leftArm.position.set(-0.29, 1.67, 0);

    this.addLimb(

      leftArm,

      new THREE.Vector3(0, 0, 0),

      new THREE.Vector3(-0.12, -0.48, 0.04),

      0.09,

      shirtColor

    );

    this.addSphere(

      leftArm,

      0.09,

      skinColor,

      new THREE.Vector3(-0.12, -0.49, 0.04)

    );

    character.add(leftArm);

    const rightArm = new THREE.Group();

    rightArm.position.set(0.29, 1.67, 0);

    this.addLimb(

      rightArm,

      new THREE.Vector3(0, 0, 0),

      new THREE.Vector3(0.12, -0.48, 0.04),

      0.09,

      shirtColor

    );

    this.addSphere(

      rightArm,

      0.09,

      skinColor,

      new THREE.Vector3(0.12, -0.49, 0.04)

    );

    character.add(rightArm);

    // Store animation references using bracket notation.

    character.userData['leftLeg'] = leftLeg;

    character.userData['rightLeg'] = rightLeg;

    character.userData['leftArm'] = leftArm;

    character.userData['rightArm'] = rightArm;

    character.userData['characterType'] = type;

    return character;

  }

  private createParticles(): void {

    const particleColors = [

      0xff8fab,

      0xffd166,

      0xffb4c8,

      0xffffff

    ];

    for (let i = 0; i < 35; i++) {

      const geometry = new THREE.SphereGeometry(

        0.025 + Math.random() * 0.035,

        8,

        8

      );

      const particle = new THREE.Mesh(

        geometry,

        new THREE.MeshBasicMaterial({

          color: particleColors[

            Math.floor(Math.random() * particleColors.length)

          ],

          transparent: true,

          opacity: 0.75

        })

      );

      particle.position.set(

        (Math.random() - 0.5) * 16,

        (Math.random() - 0.5) * 7,

        -1 + Math.random() * 2

      );

      particle.userData['initialY'] = particle.position.y;

      particle.userData['phase'] = Math.random() * Math.PI * 2;

      particle.userData['speed'] = 0.3 + Math.random() * 0.45;

      this.scene.add(particle);

      this.particles.push(particle);

    }

  }

  private ease(value: number): number {

    const t = THREE.MathUtils.clamp(value, 0, 1);

    return t * t * (3 - 2 * t);

  }

  private setCharacterOpacity(

    character: THREE.Group,

    opacity: number

  ): void {

    const clampedOpacity = THREE.MathUtils.clamp(

      opacity,

      0,

      1

    );

    character.traverse((object) => {

      if (!(object instanceof THREE.Mesh)) {

        return;

      }

      const materials = Array.isArray(object.material)

        ? object.material

        : [object.material];

      for (const material of materials) {

        material.transparent = true;

        material.opacity = clampedOpacity;

        material.depthWrite = clampedOpacity > 0.95;

      }

    });

  }

  private animate = (): void => {

    if (this.destroyed) {

      return;

    }

    this.animationFrameId = requestAnimationFrame(

      this.animate

    );

    const elapsed = (performance.now() - this.startTime) / 1000;

    const cycle = elapsed % 12;

    // Phase 1: characters enter from opposite sides.

    const enterProgress = this.ease(cycle / 2);

    // Phase 2: they meet and hold hands.

    const meetProgress = this.ease((cycle - 2) / 1.2);

    // Phase 3: they move apart toward the cards.

    const leaveProgress = this.ease((cycle - 5.2) / 2.8);

    // Phase 4: they fade and exit before repeating.

    const exitProgress = this.ease((cycle - 8.2) / 1.5);

    const startX = 12;

    const meetX = 0.48;

    const cardX = 3.8;

    const endX = 12;

    if (cycle < 2) {

      this.boy.position.x = THREE.MathUtils.lerp(

        -startX,

        -meetX,

        enterProgress

      );

      this.girl.position.x = THREE.MathUtils.lerp(

        startX,

        meetX,

        enterProgress

      );

    } else if (cycle < 5.2) {

      this.boy.position.x = -meetX;

      this.girl.position.x = meetX;

    } else if (cycle < 8.2) {

      this.boy.position.x = THREE.MathUtils.lerp(

        -meetX,

        -cardX,

        leaveProgress

      );

      this.girl.position.x = THREE.MathUtils.lerp(

        meetX,

        cardX,

        leaveProgress

      );

    } else {

      this.boy.position.x = THREE.MathUtils.lerp(

        -cardX,

        -endX,

        exitProgress

      );

      this.girl.position.x = THREE.MathUtils.lerp(

        cardX,

        endX,

        exitProgress

      );

    }

    // Walking bounce and subtle character movement.

    const walking = cycle < 2 || cycle > 5.2;

    const bounce = walking

      ? Math.abs(Math.sin(elapsed * 6)) * 0.08

      : Math.sin(elapsed * 2) * 0.025;

    this.boy.position.y = -2.5 + bounce;

    this.girl.position.y = -2.5 + bounce;

    // Turn the characters slightly toward each other.

    this.boy.rotation.y = THREE.MathUtils.lerp(

      0.12,

      0.22,

      meetProgress

    );

    this.girl.rotation.y = THREE.MathUtils.lerp(

      -0.12,

      -0.22,

      meetProgress

    );

    // Legs swing while walking.

    const boyLeftLeg = this.boy.userData['leftLeg'] as THREE.Group;

    const boyRightLeg = this.boy.userData['rightLeg'] as THREE.Group;

    const girlLeftLeg = this.girl.userData['leftLeg'] as THREE.Group;

    const girlRightLeg = this.girl.userData['rightLeg'] as THREE.Group;

    const legSwing = walking

      ? Math.sin(elapsed * 6) * 0.28

      : 0;

    boyLeftLeg.rotation.x = legSwing;

    boyRightLeg.rotation.x = -legSwing;

    girlLeftLeg.rotation.x = -legSwing;

    girlRightLeg.rotation.x = legSwing;

    // Arms open as they approach and relax when together.

    const boyLeftArm = this.boy.userData['leftArm'] as THREE.Group;

    const boyRightArm = this.boy.userData['rightArm'] as THREE.Group;

    const girlLeftArm = this.girl.userData['leftArm'] as THREE.Group;

    const girlRightArm = this.girl.userData['rightArm'] as THREE.Group;

    const meetPose = this.ease((cycle - 1.2) / 1.3);

    boyLeftArm.rotation.z = -0.12;

    boyRightArm.rotation.z = THREE.MathUtils.lerp(

      -0.15,

      -0.75,

      meetPose

    );

    girlRightArm.rotation.z = 0.12;

    girlLeftArm.rotation.z = THREE.MathUtils.lerp(

      0.15,

      0.75,

      meetPose

    );

    // Fade characters as they leave the scene.

    let opacity = 1;

    if (cycle < 0.7) {

      opacity = this.ease(cycle / 0.7);

    } else if (cycle > 8.2) {

      opacity = 1 - exitProgress;

    }

    this.setCharacterOpacity(this.boy, opacity);

    this.setCharacterOpacity(this.girl, opacity);

    // Floating particles.

    for (const particle of this.particles) {

      particle.position.y =

        (particle.userData['initialY'] as number) +

        Math.sin(

          elapsed * (particle.userData['speed'] as number) +

          (particle.userData['phase'] as number)

        ) * 0.35;

      particle.position.x +=

        Math.sin(

          elapsed * 0.3 +

          (particle.userData['phase'] as number)

        ) * 0.0008;

    }

    this.renderer.render(this.scene, this.camera);

  };

  private resizeScene(): void {

    if (!this.renderer || !this.camera) {

      return;

    }

    const stage = this.stageRef.nativeElement;

    const width = stage.clientWidth || window.innerWidth;

    const height = stage.clientHeight || window.innerHeight;

    const aspect = width / height;

    const viewHeight = 9;

    this.camera.left = -(viewHeight * aspect) / 2;

    this.camera.right = (viewHeight * aspect) / 2;

    this.camera.top = viewHeight / 2;

    this.camera.bottom = -viewHeight / 2;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);

  }

  ngOnDestroy(): void {

    this.destroyed = true;

    cancelAnimationFrame(this.animationFrameId);

    this.resizeObserver?.disconnect();

    if (this.scene) {

      this.scene.traverse((object) => {

        if (object instanceof THREE.Mesh) {

          object.geometry.dispose();

          const materials = Array.isArray(object.material)

            ? object.material

            : [object.material];

          for (const material of materials) {

            material.dispose();

          }

        }

      });

    }

    if (this.renderer) {

      this.renderer.dispose();

      const canvas = this.renderer.domElement;

      if (canvas.parentElement) {

        canvas.parentElement.removeChild(canvas);

      }

    }

  }

}
