(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!window.THREE || !canvas) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth/canvas.clientHeight, 0.1, 100);
  camera.position.z = 7;
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
  function resize(){ const w=canvas.clientWidth,h=canvas.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  window.addEventListener('resize', resize); resize();

  const group = new THREE.Group(); scene.add(group);
  const geo = new THREE.IcosahedronGeometry(2.7, 1);
  const wire = new THREE.WireframeGeometry(geo);
  const line = new THREE.LineSegments(wire, new THREE.LineBasicMaterial({color:0x5B4FE0, transparent:true, opacity:0.35}));
  group.add(line);

  const geo2 = new THREE.IcosahedronGeometry(1.4, 0);
  const wire2 = new THREE.WireframeGeometry(geo2);
  const line2 = new THREE.LineSegments(wire2, new THREE.LineBasicMaterial({color:0xFF6A3D, transparent:true, opacity:0.45}));
  group.add(line2);

  const ptsGeo = new THREE.BufferGeometry();
  const count = 110;
  const positions = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    const r = 4.4 + Math.random()*1.6;
    const theta = Math.random()*Math.PI*2, phi = Math.acos((Math.random()*2)-1);
    positions[i*3]=r*Math.sin(phi)*Math.cos(theta);
    positions[i*3+1]=r*Math.sin(phi)*Math.sin(theta);
    positions[i*3+2]=r*Math.cos(phi);
  }
  ptsGeo.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const pts = new THREE.Points(ptsGeo, new THREE.PointsMaterial({color:0x8FD400, size:0.055, transparent:true, opacity:0.6}));
  scene.add(pts);

  let mx=0, my=0;
  window.addEventListener('mousemove', e=>{ mx=(e.clientX/window.innerWidth-0.5); my=(e.clientY/window.innerHeight-0.5); });
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function animate(){
    if(reduceMotion) return;
    requestAnimationFrame(animate);
    group.rotation.y += 0.0026; group.rotation.x += 0.0009;
    line2.rotation.y -= 0.004; line2.rotation.x -= 0.002;
    pts.rotation.y -= 0.0013;
    camera.position.x += (mx*1.3 - camera.position.x)*0.04;
    camera.position.y += (-my*1.3 - camera.position.y)*0.04;
    camera.lookAt(0,0,0);
    renderer.render(scene, camera);
  }
  if(!reduceMotion) animate(); else renderer.render(scene,camera);
})();
