
# useRef in React (Performance-Optimierung)

## Was ist `useRef`?

`useRef` ist ein React-Hook, mit dem man eine "Referenz" auf ein Element oder einen Wert erstellen kann. Anders als bei `useState` bewirkt eine Änderung bei `useRef` **keinen** erneuten Render der Komponente. `useRef` gibt ein Objekt zurück, das eine `current`-Eigenschaft hat. Diese `current`-Eigenschaft kann direkt verändert werden, ohne dass der Zustand (State) der Komponente aktualisiert wird.

## Wie funktioniert `useRef`?

Wenn man `useRef` aufruft, erhält man ein Objekt zurück, das sich durch den gesamten Lebenszyklus der Komponente nicht verändert. Dieses Objekt hat eine `current`-Eigenschaft, in der man Werte oder Referenzen zu DOM-Elementen speichern kann.

Beispiel:

```tsx
const meinRef = useRef(0);  // Initialisiert eine Referenz mit dem Wert 0

console.log(meinRef.current);  // Ausgabe: 0

meinRef.current = 5;  // Ändert den Wert, ohne ein Re-Render auszulösen

console.log(meinRef.current);  // Ausgabe: 5
```

In diesem Beispiel kann der Wert von `meinRef.current` geändert werden, ohne dass die Komponente neu gerendert wird.

## Wann sollte `useRef` verwendet werden?

1. **Zugriff auf DOM-Elemente oder native Komponenten**:
   `useRef` wird oft verwendet, um direkt auf DOM-Elemente oder React Native-Komponenten zuzugreifen, z.B. um ein Eingabefeld (TextInput) zu fokussieren.

   Beispiel:

   ```tsx
   const inputRef = useRef(null);

   const fokussiereInput = () => {
     inputRef.current?.focus();  // Greift auf das Input-Element zu und fokussiert es
   };

   return <TextInput ref={inputRef} placeholder="Schreibe etwas..."/>;
   ```

2. **Speichern von Werten, ohne Re-Render**:
   Wenn man einen Wert speichern möchte, der sich ändern kann, ohne dass die Komponente neu gerendert wird, ist `useRef` ideal. Dies ist nützlich, z.B. für Timer oder API-Anfragen.

   Beispiel:

   ```tsx
   const timerRef = useRef(null);

   useEffect(() => {
     timerRef.current = setInterval(() => {
       console.log("Tick");
     }, 1000);

     return () => clearInterval(timerRef.current);
   }, []);
   ```

3. **Zwischen Renders Werte behalten**:
   `useRef` kann auch verwendet werden, um Werte zwischen den Renders zu speichern, ohne dass die Komponente neu gerendert wird. Das ist nützlich, um den vorherigen Zustand zu speichern oder für Werte, die sich ändern, aber nicht im UI sichtbar sein müssen.

## `useRef` vs `useState`

Der Hauptunterschied zwischen `useRef` und `useState` ist, dass die Änderung eines `useRef`-Wertes **kein** Re-Render der Komponente auslöst, während `useState` das tut.

### Wann sollte `useRef` anstelle von `useState` verwendet werden:
- Wenn auf ein Element oder eine Komponente direkt zugegriffen werden muss (z.B. zum Fokussieren oder Scrollen).
- Wenn ein Wert gespeichert werden muss, ohne die Komponente neu zu rendern.
- Wenn der Wert nicht direkt im UI angezeigt wird, sondern nur für interne Logik benötigt wird.

## Beispiel in einer React Native-Komponente:

Hier ist ein Beispiel, bei dem `useRef` verwendet wird, um ein `PagerView` zu steuern:

```tsx
const pagerRef = useRef<PagerView>(null);

const handleTabPress = (tab: string, index: number) => {
    pagerRef.current?.setPage(index);  // Greift direkt auf das PagerView zu, um die Seite zu ändern
};
```

In diesem Fall wird `useRef` verwendet, um eine Referenz auf die `PagerView`-Komponente zu speichern, sodass man später damit interagieren kann, ohne dass die Komponente neu gerendert wird.

## Fazit

`useRef` ist ein hilfreicher Hook, wenn man auf DOM-Elemente zugreifen oder veränderbare Werte speichern möchte, ohne die Komponente neu zu rendern. Er sollte verwendet werden, wenn direkter Zugriff auf ein Element oder ein Wert über mehrere Renders hinweg bestehen bleiben muss, ohne dass der Zustand der Komponente beeinflusst wird.
