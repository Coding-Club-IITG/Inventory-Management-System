clc;
clear;
format shorte;

maxIter=1e4;
tolerance=1e-6;
n=3;

x=[0,0,0];
f1 = @(x1,x2,x3) 6*x1-2*cos(x2.*x3)-1; 
f2 = @(x1,x2,x3) 9*x2+sqrt(x1.^2+sin(x3)+1.06)+0.9;
f3 = @(x1,x2,x3)  60*x3+3*exp(-x1*x2)+10*pi-3;
%gi for plotting purpose
g1= @(x2,x3) (2*cos(x2.*x3)+1)/6;
g2= @(x1,x3) -(sqrt(x1.^2+sin(x3)+1.06)+0.9)/9;
g3= @(x1,x2) -(3*exp(-x1*x2)+10*pi-3)/60;

F={f1,f2,f3};
G={g1,g2,g3};

x=NewtonNLE(F,G,n,maxIter,tolerance,x,-0.6,0.6,[3,2,1]);