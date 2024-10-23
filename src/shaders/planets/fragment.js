export default /* glsl */ `

uniform sampler2D uPlanetTexture;
uniform vec3 uSunDirection;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main()
{
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.0);

    // Sun orientation
    float sunOrientation = dot(uSunDirection, normal);

    // Day / night color
    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uPlanetTexture, vUv).rgb;
    vec3 nightColor = vec3(dot(dayColor, vec3(0.02, 0.02, 0.02)));
   
    color = mix(nightColor, dayColor, dayMix);
    
    // Final color
    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;

// 0.299, 0.587, 0.114;
