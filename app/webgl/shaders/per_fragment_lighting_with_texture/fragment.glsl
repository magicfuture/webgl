#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vTransformedNormal;
varying vec4 vPosition;

uniform bool uUseLighting;
uniform bool uUseTextures;

uniform vec3 uAmbientColor;

uniform vec3 uPointLightLocation;
uniform vec3 uPointLightColor;

uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;

uniform sampler2D texture0;

void main(void) {
  vec3 lightWeighting;
  if (!uUseLighting) {
    lightWeighting = vec3(1.0, 1.0, 1.0);
  } else {
  
//att = 1.0 / (lightAttenuationi[0] + lightAttenuationi[1] * lightdisti + lightAttenuationi[2] * lightdisti * lightdisti);
  
  
    vec3 lightDist = uPointLightLocation - vPosition.xyz;
    float lightDistMag = length(lightDist);
    vec3 lightDirection = normalize(lightDist);
    float atte = 1.0 / (1.0 + 0.002 * lightDistMag + 0.0008 * lightDistMag * lightDistMag);
    //vec4 transformedNormal = nMatrix * vec4(aVertexNormal, 1.0);

    float directionalLightWeighting = max(dot(vTransformedNormal.xyz, uLightingDirection), 0.0);
    float pointLightWeighting = max(dot(normalize(vTransformedNormal.xyz), lightDirection), 0.0);
    lightWeighting = uAmbientColor +
                     uDirectionalColor * directionalLightWeighting +
                     uPointLightColor * pointLightWeighting;// * atte;
  }

  vec4 fragmentColor;
  // useTextures is not yet implemented
  //if (uUseTextures) {
    fragmentColor = texture2D(texture0, vec2(vTextureCoord.s, vTextureCoord.t));
  //} else {
  //  fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);
  //}
  gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, fragmentColor.a);
}
