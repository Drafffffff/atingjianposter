// import { Scene } from './scene';
import * as p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import { Graph } from './graph';
import poster from './poster.png';

const sketch = (p: p5): void => {
  // const scene = new Scene();
  let pos: p5.Vector;
  // const mic = new p5.AudioIn();
  let graph: Graph;
  let img: p5.Image;
  p.preload = (): void => {
    img = p.loadImage(poster);
  };

  p.setup = (): void => {
    p.createCanvas(p.windowWidth, p.windowWidth * 1.5);
    pos = p.createVector(p.width / 2, p.height / 2);
    graph = new Graph(p, pos);
    // mic.start();
  };
  p.windowResized = (): void => {
    p.resizeCanvas(p.windowWidth, p.windowWidth * 1.5);
  };

  p.draw = (): void => {
    // const micLevel = mic.getLevel();
    // console.log(micLevel);
    p.background(255);
    graph.update();
    graph.draw();
    p.image(img, 0, 0, p.width, p.height);
  };
};

new p5(sketch);
