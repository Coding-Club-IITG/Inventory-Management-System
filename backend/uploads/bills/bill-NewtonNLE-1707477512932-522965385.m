function x= NewtonNLE(F,G,n,maxIter,tolerance,x,rangeStart,rangeEnd,rotate)
%     disp(F);
    fprintf('N\t');
    symbolicVariables=cell(1,n);
    for i =1:n
        symbolicVariables{i}=sym(['x',num2str(i)]);
        fprintf('x%d\t\t',i);
    end;
    fprintf('Error (norm infinity of (x_n-x_{n-1}))\n');
    J=jacobian(F,[symbolicVariables{:}]);
    k=0;
    FinvF=J\F';
    residue=[];
    iterates=[x];
    f=[subs(F,symbolicVariables,x)];
    while (k<maxIter)
        fprintf('%d\t',k+1);
        y=double(-subs(FinvF,symbolicVariables,x));
        residue=[residue;y'];
        x=x+y';
        iterates=[iterates;x];
        f=[f;subs(F,symbolicVariables,x)];
        for i=1:n
            fprintf('%d\t',x(i));
        end
        fprintf('%d\t',norm(y,inf));        
        fprintf('\n');
        if norm(y(i),inf)<tolerance
            k=k+1;
            break;
        end;
        k=k+1;
    end
    k=k-1;
    %graphs
%     disp(residue(:1));
%     disp(k);
    % N vs error
    figure
    for i=1:n
        plot(1:k+1,residue(:,i),'-x','DisplayName', ['x' num2str(i)]);
        hold on;
    end
    title('N(iteration) vs error plot');
    xlabel('Number of Iterations');
    ylabel('Error (infinite norm of consecutive iterates)');
    grid on;
    legend('show');
    hold off;
    
    %N vs iterates
    figure
    for i=1:n
        plot(1:k+2,iterates(:,i),'-x','DisplayName', ['x' num2str(i)]);
        hold on;
    end
    title('N(iteration) vs Iterates');
    xlabel('Number of Iterations');
    ylabel('Iterates');
    grid on;
    legend('show');
    hold off;
    
    %N vs function values
    figure
    for i=1:n
        plot(1:k+2,f(:,i),'-x','DisplayName', ['f' num2str(i)]);
        hold on;
    end
    title('N(iteration) vs Function values');
    xlabel('Number of Iterations');
    ylabel('Function values');
    grid on;
    legend('show');
    hold off;
    
    %solution plots plotting x3=g(x1,x2) in [0,3]
    figure
    xx = linspace(rangeStart, rangeEnd, 100);
    yy = linspace(rangeStart, rangeEnd, 100);
    [X, Y] = meshgrid(xx, yy);
    colors = {'r', 'g', 'b'};
    for i=1:n
        Z=G{i}(X,Y);
        if rotate(i)==1
            surf(X,Y,Z,'DisplayName',['g',num2str(i)],'FaceColor',colors{i});
        elseif rotate(i)==2
            surf(X,Z,Y,'DisplayName',['g',num2str(i)],'FaceColor',colors{i});
        else
            surf(Z,Y,X,'DisplayName',['g',num2str(i)],'FaceColor',colors{i});
        end
        hold on;
    end
    zero=@(x1,x2) 0.*x1+0.*x2;
    if n<3
        surf(X,Y,zero(X,Y),'DisplayName','z=0 plot','FaceColor','black');
    end
    xlabel('X1');
    ylabel('X2');
    zlabel('X3');
    legend('show');
    title('Function plots');
    hold off;
    