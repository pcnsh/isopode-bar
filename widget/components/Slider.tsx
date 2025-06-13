import { App, Astal, Gtk, Gdk, Audio } from "astal/gtk4"
import { Variable, GLib, bind, exec} from "astal"



const debounce = (func, delay) => {
    let timeoutId = null;

    return (...args) => {
        // If a timer is already running, cancel it
        if (timeoutId) {
            GLib.source_remove(timeoutId);
        }
        
        // Set a new timer
        timeoutId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, delay, () => {
            // When the timer finishes, execute the original function
            func(...args);
            timeoutId = null; // Clear the timer ID
            return GLib.SOURCE_REMOVE; // Don't repeat the timer
        });
    };
};

export default function Slider(props) {
 const currentValue = Variable("")


const debouncedUpdate = debounce(sliderValue => {
    // This code will only run 500ms after the user stops moving the slider.
    
    // Note: We pass 'sliderValue' directly instead of the whole 'slider' object.
    const value = sliderValue;

    if(props.title == "Brightness") {
        const round = Math.round(value * 100);
        log(round);
        exec(`sh -c "brightnessctl set ${round}%"`);
    }
    
    // This part seems to be for a different kind of item (volume).
    // Ensure that 'props.item' exists before trying to set a property on it.
    if (props.item) {
        props.item.volume = value;
    }

    currentValue.set(value);
}, 200); // 500ms = 0.5 seconds
   
  return  <box
            cssClasses={["group-menu"]}
            valign={Gtk.Align.START}
            orientation={Gtk.Orientation.VERTICAL}
            hSpacing={8}
            >
            <label halign={Gtk.Align.START} label={`${props.title}`}/>
            <label cssClasses={["state"]}halign={Gtk.Align.START} label={"Normal"}/>
            <box vexpand valign={Gtk.Align.END} cssClasses={["audio-slider"]}>
                <overlay>
                      <box >
                        <slider
                          hexpand
                            onValueChanged={slider => {
                              // log(slider.value)
                              if(props.title == "Brightness") {
                                debouncedUpdate(slider.value);                                
                              }
                              props.item.volume = slider.value
                              currentValue.set(slider.value)
                              }}
                            min={0.2}
                            value={props.initialValue}
                            />
                          </box>
                        <label
                            label={currentValue((v) => `${Math.round(v * 100)}`)}
                            halign={Gtk.Align.START}
                            valign={Gtk.Align.CENTER}
                            type="overlay"
                            canFocus={false}
                            canTarget={false}
                            passThrough
                        />
                        <box
                            halign={Gtk.Align.END}
                            valign={Gtk.Align.CENTER}
                            type="overlay"
                            canFocus={false}
                            canTarget={false}
                            passThrough
                        >
                            <Gtk.Image cssClasses={["icon"]} iconName={`${props.icon}`}/>
                        </box>
                </overlay>
              </box>
            </box>
}
